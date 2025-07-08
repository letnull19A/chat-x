const data = [
  {
    id: 0,
    name: 'mock chat',
    users: 2,
    online: 1,
  },
  {
    id: 1,
    name: 'ДМБ2025',
    users: 1,
    online: 1,
  },
  {
    id: 2,
    name: 'Чат хакеров и разрабоьчиков на C/C++',
    users: 72662,
    online: 626,
  },
]

const ChatApi = {
  getAll: (): Array<any> => {
    return data
  },
  getById: (id: number) => {
    return data.find((t) => t.id === id)
  },
}

export default ChatApi
