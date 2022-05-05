export default {
  categorys({ categorys }) {
    let arr1 = []
    let arr2 = []
    categorys.forEach((item, index) => {
      if (arr1.length < 8) {
        arr1.push(item)
        if (index === categorys.length - 1) {
          arr2.push(arr1)
          return
        }
        if (arr1.length === 8) {
          arr2.push(arr1)
          arr1 = []
        }
      }
    })
    return arr2
  },
  footer_count({ footer_foods }) {
    return footer_foods.reduce((total, item) => {
      return (total += item.count)
    }, 0)
  },
  footer_price({ footer_foods }) {
    return footer_foods.reduce((total, item) => {
      return (total += item.count * Math.round(item.row_price * item.discount * 0.1))
    }, 0)
  }
}
