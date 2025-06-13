const ChatApi = {
  getAll: (): Array<any> => {
    return [
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
    ]
  },
}

export default ChatApi
