import * as lowdb from 'lowdb'
import * as Memory from 'lowdb/adapters/Memory'
import SessionStorage from './adapters/SessionStorage'

const createDB = (name: string = 'MoxieDB', initialState = {}) => {
  return lowdb(
    // @ts-ignore
    process.env.NODE_ENV === 'test'
      ? new Memory(name)
      : new SessionStorage(name),
  )
}

export default createDB
