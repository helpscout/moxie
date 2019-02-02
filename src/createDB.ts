import * as lowdb from 'lowdb'
import * as Memory from 'lowdb/adapters/Memory'
import {MoxieName, InitialState} from './types'
import SessionStorage from './adapters/SessionStorage'

const createDB = (name: MoxieName = 'MoxieDB', initialState?: InitialState) => {
  const database = lowdb(
    // @ts-ignore
    process.env.NODE_ENV === 'test'
      ? new Memory(name)
      : /* istanbul ignore next */
        new SessionStorage(name),
  )

  if (initialState) {
    database.defaults(initialState).write()
  }

  return database
}

export default createDB
