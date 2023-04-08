export interface User {
  id?: string
  number?: string
  password?: string
  nickName?: string
  avatarUrl?: string
  sign?: string
  insertTime?: string
  updateTime?: string
}

export interface Article {
  id?: string
  label?: string
  title?: string
  imgUrl?: string
  digest: string
  content?: string
  insertTime?: string
  updateTime?: string
}

export interface Message {
  id?: string
  content?: string
  insertTime?: string
  updateTime?: string
}

