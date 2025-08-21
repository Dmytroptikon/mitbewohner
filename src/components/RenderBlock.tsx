
import Products  from './Products'
import Shoping from './Shoping'

export const renderBlock = (block: any, key: number) => {
  switch (block.blockType) {
    case 'products':
      return <Products key={key} {...block} />
    case 'shoping':
      return <Shoping key={key} {...block} />
    default:
      return null
  }
}
