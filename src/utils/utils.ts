interface priceArrayType {
  price: number
}

const calculateLowestPrice = (priceArray: priceArrayType[]) => {
  let lowestPrice = priceArray[0]

  for (let i = 0; i < priceArray.length; i++) {
    if (priceArray[i].price < lowestPrice.price) {
      lowestPrice = priceArray[i]
    }
  }

  return lowestPrice.price
}

const calculateHighestPrice = (priceArray: priceArrayType[]) => {
  let highestPrice = priceArray[0]

  for (let i = 0; i < priceArray.length; i++) {
    if (priceArray[i].price > highestPrice.price) {
      highestPrice = priceArray[i]
    }
  }

  return highestPrice.price
}

const calculateAveragePrice = (priceArray: priceArrayType[]) => {
  const sum = priceArray.reduce((acc, currentValue) => {
    acc += currentValue.price
    return acc
  }, 0)

  const avgPrice = sum / priceArray.length

  return avgPrice
}


export {
  calculateLowestPrice,
  calculateHighestPrice,
  calculateAveragePrice
}