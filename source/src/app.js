// import './roles/standby'
import './utils/RoomVisual'
import defense from './defense'
import architect from './architect'
import spawner from './spawner'

const ROOM = 'W3N7'

for(var i in Memory.creeps) {
    if(!Game.creeps[i]) {
        delete Memory.creeps[i];
    }
}

defense.run(ROOM)
spawner.run(ROOM)

// architect.clearConstructionSites(ROOM)
// architect.visualizeConstructionSites(ROOM, { x: 27, y: 9 })
architect.createConstructionSites(ROOM, { x: 27, y: 9 })
