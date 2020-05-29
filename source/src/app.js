// import './roles/standby'
import './utils/RoomVisual'
import multitask from './roles/multitask'
import defense from './defense'
import architect from './architect'

const ROOM = 'W3N7'

multitask.run(ROOM, 8)
defense.run(ROOM)

// architect.clearConstructionSites(ROOM)
// architect.visualizeConstructionSites(ROOM, { x: 27, y: 9 })
architect.createConstructionSites(ROOM, { x: 27, y: 9 })
