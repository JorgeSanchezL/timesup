import { useContext } from "react"
import { StoreContext } from "../store"

export function Normalise(value: number) {
    const { time } = useContext(StoreContext)
    return (value - 0) * 100 / (time - 0)
}

export function CombineScores(scores: { [key: string]: number }[]): { [key: string]: number } {
    let combinedScore: { [key: string]: number } = {}
    scores.forEach(score => {
        Object.keys(score).forEach(key => {
            if (combinedScore[key] === undefined) {
                combinedScore[key] = 0
            }
            combinedScore[key] += score[key]
        })
    })
    return combinedScore
}