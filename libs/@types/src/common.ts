type TCommon = {
 id: string
}

export type TUser = {
 nickname: string
 password: string
 login: string
} & TCommon

export type TChat = {
 title: string
} & TCommon
