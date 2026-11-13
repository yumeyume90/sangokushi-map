import { useEffect, useState } from 'react'
import { EventScreen } from './screens/EventScreen'
import { MapScreen } from './screens/MapScreen'
import { Settings } from './screens/Settings'
import { Timeline } from './screens/Timeline'
import { Top } from './screens/Top'
import { Zukan } from './screens/Zukan'
import { parseHash, StoreProvider, type Route } from './store'

const W = 390
const H = 844

/** スマホ1画面ぶん（390×844）を、ウィンドウに収まるように拡大縮小する */
function useScale() {
  const calc = () => Math.min(window.innerWidth / W, window.innerHeight / H, 1.25)
  const [s, setS] = useState(calc)
  useEffect(() => {
    const on = () => setS(calc())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return s
}

function useRoute(): Route {
  const [r, setR] = useState<Route>(() => parseHash(window.location.hash))
  useEffect(() => {
    const on = () => setR(parseHash(window.location.hash))
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return r
}

function Screen({ route }: { route: Route }) {
  switch (route.name) {
    case 'map':
      return <MapScreen />
    case 'timeline':
      return <Timeline />
    case 'zukan':
      return <Zukan />
    case 'settings':
      return <Settings />
    case 'event':
      return <EventScreen key={route.id} id={route.id} />
    default:
      return <Top />
  }
}

export default function App() {
  const scale = useScale()
  const route = useRoute()
  const key = route.name === 'event' ? `event-${route.id}` : route.name

  return (
    <StoreProvider>
      <div className="viewport">
        <div style={{ width: W * scale, height: H * scale, flex: 'none' }}>
          <main className="stage" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <Screen key={key} route={route} />
          </main>
        </div>
      </div>
    </StoreProvider>
  )
}
