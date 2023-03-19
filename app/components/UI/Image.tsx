import Image, {ImageProps} from "next/image";
import './Image.scss'

interface Props extends ImageProps {
  className?: string
}

export default function StyledImage({className, ...rest}: Props) {
  return (
    <Image className={className} {...rest}/>
  )
}
