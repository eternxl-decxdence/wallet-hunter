import { useState } from 'react'
import './FoundBlock.scss'

interface Found {
  id: string
  address: string
  seed: string
  balance: string
}

export default function FoundBlock() {
  const [found, setFound] = useState<Found[]>([])

  return (
    <div className="found-block">
      <div className="found-label">
        <p className="found-title">Found Addresses</p>
      </div>
      {found.length > 0 ? (
        found.map((data: Found) => (
          <div key={data.id} className="found-item">
            <p className="found-text address">{`${data.address.substring(0, 9)}...`}</p>
            <p className="found-text balance">{`${data.balance}`}</p>
            <p className="found-text seed">SEED</p>
          </div>
        ))
      ) : (
        <p className="found-none-message">
          Nothing here for now! <br /> Hunt More!
        </p>
      )}
    </div>
  )
}
