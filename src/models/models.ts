export interface Player{
    id: number,
    isAdmin: boolean,
    name: string,
    login: string,
    password: string
}

export interface PlayerCreate{
    name: string,
    login: string,
    password: string
}

export interface BaseLog{
    id: number,
    date: Date,
    player: Player
}

export interface Message{
    id: number,
    content: string,
    base_log: BaseLog
}

export interface MessageCreate{
    content: string,
    player_id: number
}

export interface DiceLog{
    id: number,
    value: number,
    max: number,
    base_log: BaseLog
}

export interface DiceLogCreate{
    value: number,
    max: number,
    player_id: number
}