
import Products  from './Products'

export const renderBlock = (block: any, key: number) => {
  switch (block.blockType) {
    case 'products':
      return <Products key={key} {...block} />
    default:
      return null
  }
}
