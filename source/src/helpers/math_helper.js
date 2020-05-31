export const sin = Math.sin
export const cos = Math.cos
export const tan = Math.tan
export const atan2 = Math.atan2

export function random(min = 0, max = 1) {
    return Math.random() * (max-min) + min
}

export function randomInt(min, max) {
    return Math.round(Math.random() * (max-min) + min)
}

export function limits(n, min, max) {
    if (n >= min && n <= max) return n
    if (n < min) return min
    return Math.min(max, Math.max(n, min))
}