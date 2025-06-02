import type { UUID } from "crypto"

export interface record{
    id: string,
    startDate: Date,
    endDate: Date,
    createDate: Date,
    note: string,
    uid: string
}