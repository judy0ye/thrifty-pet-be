import { Request, Response } from "express";
import ProductModel from '../models/product'
import { scrapeOneProduct } from "../scraper/scraper";
import { calculateAveragePrice, calculateHighestPrice, calculateLowestPrice } from "../utils/utils";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { productUrl } = req.body;

    const scrapedProduct = await scrapeOneProduct(productUrl)

    let updatedPrice = scrapedProduct
    const existingProduct = await ProductModel.findOne({ url: scrapedProduct.url })

    if (existingProduct) {
      const updatedPriceHistory = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice }
      ]

      updatedPrice = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: calculateLowestPrice(updatedPriceHistory),
        highestPrice: calculateHighestPrice(updatedPriceHistory),
        averagePrice: calculateAveragePrice(updatedPriceHistory)
      }

      const updatedProduct = await ProductModel.findOneAndUpdate({ url: scrapedProduct.url },
        updatedPrice,
        { upsert: true, new: true }
      )

      res.status(200).json({ product: updatedProduct })

    } else {
      const newProduct = await ProductModel.create(scrapedProduct)
      res.status(201).json({ product: newProduct })
    }

  } catch (error) {
    res.status(500).json({ error });
  }
}

const getProductsPeriodically = async () => {
  try {
    const products = await ProductModel.find({})
    if (!products) {
      throw new Error('No products found')
    }

    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        const newProduct = await scrapeOneProduct(product.url)

        if (!newProduct) {
          return
        }

        const updatedPriceHistory = [
          ...product.priceHistory,
          { price: newProduct.currentPrice }
        ]

        const updatedProductWithPrice = {
          ...newProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: calculateLowestPrice(updatedPriceHistory),
          highestPrice: calculateHighestPrice(updatedPriceHistory),
          averagePrice: calculateAveragePrice(updatedPriceHistory)
        }

        const updatedProduct = await ProductModel.findOneAndUpdate(
          {
            url: updatedProductWithPrice.url
          },
          updatedProductWithPrice
        )

        return updatedProduct
      })
    )
    return updatedProducts
  } catch (error) {
    console.log(error)
  }
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await ProductModel.find();
    res.status(200).json({ products: allProducts })
  } catch (error) {
    res.status(500).json({ error });
  }
}

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    const specificProduct = await ProductModel.findById(productId)
    specificProduct ? res.status(200).json({ product: specificProduct }) : res.status(404).json({ message: 'not found' })
  } catch (error) {
    res.status(500).json({ error });
  }
}

export default {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsPeriodically
}