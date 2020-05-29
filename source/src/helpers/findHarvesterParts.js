/**
 * @example 
 * const result = find_harvester_parts(40, 550, true)
 * 
 * @param {number} distance Distance between storage/spawn and energy node
 * @param {number} max_production_cost Maximum available energy to create a creep
 * @param {boolean} use_road Creeps will stay on roads
 */
export function findHarvesterParts(distance, max_production_cost, use_road = false) {
    const lifetime = CREEP_LIFE_TIME
    const ticks_travelling = distance * 2

    let best_energy_ratio = 0
    let best_parts = null

    for (let parts_work = 1; parts_work < 25; parts_work++) {
        for (let parts_carry = 1; parts_carry < 25; parts_carry++) {
            const parts_move = (use_road)
                ? Math.ceil((parts_work + parts_carry) / 2)
                : parts_work + parts_carry
            
            if (parts_work + parts_carry + parts_move > 50) {
                break
            }

            const production_cost = parts_work * 100 + parts_carry * 50 + parts_move * 50
            
            if (production_cost > max_production_cost) {
                break
            }

            const carry_capacity = parts_carry * 50
            const ticks_refilling = carry_capacity / 2 / parts_work
            const total_gathered = (lifetime / (ticks_travelling + ticks_refilling)) * carry_capacity
            const energy_ratio = total_gathered / production_cost

            if (energy_ratio > best_energy_ratio) {
                best_energy_ratio = energy_ratio
                best_parts = {
                    work: parts_work,
                    carry: parts_carry,
                    move: parts_move
                }
            }
        }
    }

    const final_parts = [
        Array(best_parts.work).fill(WORK),
        Array(best_parts.carry).fill(CARRY),
        Array(best_parts.move).fill(MOVE),
    ].flat()

    return {
        ratio: best_energy_ratio,
        parts: final_parts,
        roads: use_road
    }
}
