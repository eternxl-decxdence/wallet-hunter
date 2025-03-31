import './FancyBackground.scss'
import Figure1 from '../../assets/bg-polygons/figure1.svg?react'
import Figure2 from '../../assets/bg-polygons/figure2.svg?react'
import Figure3 from '../../assets/bg-polygons/figure3.svg?react'
import Figure4 from '../../assets/bg-polygons/figure4.svg?react'

export default function FancyBackground() {
  return (
    <div className="background">
      <Figure1 className="ray first-poly" />
      <Figure2 className="ray second-poly" />
      <Figure3 className="ray third-poly" />
      <Figure4 className="ray fourth-poly" />
    </div>
  )
}
