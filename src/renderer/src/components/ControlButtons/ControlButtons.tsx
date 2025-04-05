import './ControlButtons.scss'
import { CurrentPage } from '@renderer/interfaces/CurrentPage'

export default function ControlButtons({ activePage }: { activePage: CurrentPage }) {
  function switchPage(page) {
    if (page === activePage) return
    else {
      window.location.href = page
    }
  }

  return (
    <div className="control-buttons">
      <button
        className={`switch-page ${activePage == CurrentPage.Terminal && 'active'}`}
        onClick={() => switchPage(CurrentPage.Terminal)}
      >
        Terminal
      </button>
      <button
        className={`switch-page ${activePage == CurrentPage.Farm && 'active'}`}
        onClick={() => switchPage(CurrentPage.Farm)}
      >
        Farm
      </button>
    </div>
  )
}
