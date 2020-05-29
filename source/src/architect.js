// {"name":"textExport","shard":"shard0","rcl":"8","buildings":{"constructedWall":{"pos":[{"x":8,"y":10},{"x":9,"y":10},{"x":10,"y":10},{"x":11,"y":10},{"x":21,"y":10},{"x":22,"y":10},{"x":23,"y":10},{"x":24,"y":10},{"x":8,"y":11},{"x":11,"y":11},{"x":18,"y":11},{"x":21,"y":11},{"x":24,"y":11},{"x":8,"y":12},{"x":11,"y":12},{"x":12,"y":12},{"x":13,"y":12},{"x":14,"y":12},{"x":15,"y":12},{"x":16,"y":12},{"x":17,"y":12},{"x":18,"y":12},{"x":21,"y":12},{"x":24,"y":12},{"x":8,"y":13},{"x":9,"y":13},{"x":22,"y":13},{"x":23,"y":13},{"x":24,"y":13},{"x":9,"y":14},{"x":22,"y":14},{"x":9,"y":15},{"x":22,"y":15},{"x":9,"y":16},{"x":22,"y":16},{"x":9,"y":17},{"x":22,"y":17},{"x":9,"y":18},{"x":22,"y":18},{"x":9,"y":19},{"x":22,"y":19},{"x":9,"y":20},{"x":22,"y":20},{"x":9,"y":21},{"x":22,"y":21},{"x":9,"y":22},{"x":22,"y":22},{"x":9,"y":23},{"x":22,"y":23},{"x":8,"y":24},{"x":9,"y":24},{"x":22,"y":24},{"x":23,"y":24},{"x":24,"y":24},{"x":8,"y":25},{"x":11,"y":25},{"x":12,"y":25},{"x":13,"y":25},{"x":14,"y":25},{"x":15,"y":25},{"x":16,"y":25},{"x":17,"y":25},{"x":18,"y":25},{"x":21,"y":25},{"x":24,"y":25},{"x":8,"y":26},{"x":11,"y":26},{"x":18,"y":26},{"x":21,"y":26},{"x":24,"y":26},{"x":8,"y":27},{"x":9,"y":27},{"x":10,"y":27},{"x":11,"y":27},{"x":21,"y":27},{"x":22,"y":27},{"x":23,"y":27},{"x":24,"y":27}]},"tower":{"pos":[{"x":9,"y":11},{"x":22,"y":11},{"x":23,"y":12}]},"container":{"pos":[{"x":23,"y":11},{"x":9,"y":12}]},"extension":{"pos":[{"x":11,"y":13},{"x":12,"y":13},{"x":13,"y":13},{"x":14,"y":13},{"x":15,"y":13},{"x":16,"y":13},{"x":17,"y":13},{"x":10,"y":14},{"x":10,"y":15},{"x":12,"y":15},{"x":13,"y":15},{"x":14,"y":15},{"x":15,"y":15},{"x":16,"y":15},{"x":17,"y":15},{"x":10,"y":16},{"x":12,"y":16},{"x":13,"y":16},{"x":14,"y":16},{"x":15,"y":16},{"x":16,"y":16},{"x":17,"y":16},{"x":10,"y":17},{"x":10,"y":18},{"x":11,"y":18},{"x":12,"y":18},{"x":13,"y":18},{"x":14,"y":18},{"x":15,"y":18},{"x":16,"y":18},{"x":10,"y":19},{"x":11,"y":19},{"x":12,"y":19},{"x":13,"y":19},{"x":14,"y":19},{"x":15,"y":19},{"x":16,"y":19},{"x":10,"y":20},{"x":10,"y":21},{"x":12,"y":21},{"x":13,"y":21},{"x":14,"y":21},{"x":15,"y":21},{"x":16,"y":21},{"x":17,"y":21},{"x":10,"y":22},{"x":12,"y":22},{"x":13,"y":22},{"x":14,"y":22},{"x":15,"y":22},{"x":16,"y":22},{"x":17,"y":22},{"x":10,"y":23},{"x":11,"y":24},{"x":12,"y":24},{"x":13,"y":24},{"x":14,"y":24},{"x":15,"y":24},{"x":16,"y":24},{"x":17,"y":24}]},"spawn":{"pos":[{"x":21,"y":14},{"x":21,"y":16},{"x":21,"y":23}]},"storage":{"pos":[{"x":21,"y":18}]},"link":{"pos":[{"x":21,"y":19}]},"powerSpawn":{"pos":[{"x":21,"y":21}]}}}

const layout = `
■ ■ ■ ■                   ■ ■ ■ ■
■ T3. ■             ■ ↓ ↑ ■ T1C1■
■ C3. ■ ■ ■ ■ ■ ■ ■ ■ ↓ ↑ ■ . T5■
■ ■ . ● ● ● ● ● ● ● . ↓ ↑ . ■ ■ ■
  ■ ● ↓ ← ← ← ← ← ← . ↓ ↑ S1■
  ■ ● ↓ ● ● ● ● ● ● . ↓ ↑ . ■
  ■ ● ↓ ● ● ● ● ● ● . ↓ ↑ S2■
  ■ ● → → → → → → → . ↓ ↑ . ■
  ■ ● ● ● ● ● ● ● ● . ↓ ↑ B ■
  ■ ● ● ● ● ● ● ● ● . ↓ ↑ L1■
  ■ ● ↓ ← ← ← ← ← ← . ↓ ↑ . ■
  ■ ● ↓ ● ● ● ● ● ● . ↓ ↑ PS■
  ■ ● ↓ ● ● ● ● ● ● . ↓ ↑ . ■
  ■ ● → → → → → → → . ↓ ↑ S3■
■ ■ . ● ● ● ● ● ● ● . ↓ ↑ . ■ ■ ■
■ C4. ■ ■ ■ ■ ■ ■ ■ ■ ↓ ↑ ■ . T2■
■ T4. ■             ■ ↓ ↑ ■ T6C2■
■ ■ ■ ■                   ■ ■ ■ ■
`
export default {

    createConstructionSites(room_name, corner, visualizeOnly = false) {
        const visual = new RoomVisual(room_name)
        const buildings = this.getLayoutBuildings()

        for (const b of buildings) {
            const x = corner.x + b.x
            const y = corner.y + b.y

            if (visualizeOnly) {
                visual.structure(x, y, b.type, { opacity: 0.2 })
            } else {
                Game.rooms[room_name].createConstructionSite(x, y, b.type)
            }

        }
    },

    visualizeConstructionSites(room_name, corner) {
        this.createConstructionSites(room_name, corner, true)
    },

    clearConstructionSites(room_name) {
        const sites = Game.rooms[room_name].find(FIND_CONSTRUCTION_SITES)

        for (const site of sites) { 
            site.remove()
        }
    },

    getLayoutBuildings() {
        const lines = layout.split("\n").slice(1,-1)
        
        const lines_with_buildings = lines.map((line, y) => {
            return line.match(/.{1,2}/g)
                .map(str => str.trim())
                .map((str, x) => this.getBuildingBySymbol(str, x, y))
                .filter(building => building !== null)
        })
        
        const buildings = lines_with_buildings.flat()
            .sort((a, b) => a.priority - b.priority)

        return buildings
    },

    getBuildingBySymbol(str, x, y) {
        let building = null

        switch (str) {
            case '■': building = { type: STRUCTURE_WALL, priority: x + y * 100 }; break

            case '●': building = { type: STRUCTURE_EXTENSION, priority: x + y * 100 }; break

            // case 'C1': building = { type: STRUCTURE_CONTAINER, priority: 1 }; break
            // case 'C2': building = { type: STRUCTURE_CONTAINER, priority: 2 }; break
            // case 'C3': building = { type: STRUCTURE_CONTAINER, priority: 3 }; break
            // case 'C4': building = { type: STRUCTURE_CONTAINER, priority: 4 }; break
            // case 'C5': building = { type: STRUCTURE_CONTAINER, priority: 5 }; break

            case 'T1': building = { type: STRUCTURE_TOWER, priority: 1 }; break
            case 'T2': building = { type: STRUCTURE_TOWER, priority: 2 }; break
            case 'T3': building = { type: STRUCTURE_TOWER, priority: 3 }; break
            case 'T4': building = { type: STRUCTURE_TOWER, priority: 4 }; break
            case 'T5': building = { type: STRUCTURE_TOWER, priority: 5 }; break
            case 'T6': building = { type: STRUCTURE_TOWER, priority: 6 }; break

            case 'S1': building = { type: STRUCTURE_SPAWN, priority: 1 }; break
            case 'S2': building = { type: STRUCTURE_SPAWN, priority: 2 }; break
            case 'S3': building = { type: STRUCTURE_SPAWN, priority: 3 }; break

            case 'PS': building = { type: STRUCTURE_POWER_SPAWN, priority: 1 }; break

            case 'B': building = { type: STRUCTURE_POWER_BANK, priority: 1 }; break

            case 'L1': building = { type: STRUCTURE_LINK, priority: 1 }; break
            case 'L2': building = { type: STRUCTURE_LINK, priority: 2 }; break
            case 'L3': building = { type: STRUCTURE_LINK, priority: 3 }; break
            case 'L4': building = { type: STRUCTURE_LINK, priority: 4 }; break
            case 'L5': building = { type: STRUCTURE_LINK, priority: 5 }; break
            case 'L6': building = { type: STRUCTURE_LINK, priority: 6 }; break

            // case '.': building = { type: STRUCTURE_ROAD, priority: 1 }; break
            // case '↑': building = { type: STRUCTURE_ROAD, priority: 1 }; break
            // case '→': building = { type: STRUCTURE_ROAD, priority: 1 }; break
            // case '↓': building = { type: STRUCTURE_ROAD, priority: 1 }; break
            // case '←': building = { type: STRUCTURE_ROAD, priority: 1 }; break

            default: building = null
        }

        if (building !== null) {
            building.x = x
            building.y = y
        }

        return building
    }
}