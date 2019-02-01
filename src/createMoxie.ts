import * as Pattern from 'url-pattern'
import createDB from './createDB'
import {MoxieName, Schemas, InitialState, Path} from './types'

const defaultOptions = {
  responseReducer: (response: any) => response,
}

function createMoxie(
  name: MoxieName = 'MoxieDB',
  schemas: Schemas = {},
  initialState: InitialState = {},
  options: any = defaultOptions,
) {
  const database = createDB(name, initialState)
  const {responseReducer} = options

  function get(path: Path): any {
    const pattern = new Pattern(`/:route(/:id)`).match(path) || {}
    const {route, id} = pattern
    let response

    if (!route && !id) {
      return Promise.reject()
    }

    if (id) {
      response = database
        .get(route)
        .find({id})
        .value()
    } else {
      response = database.get(route).value()
    }

    return new Promise((resolve, reject) => {
      if (!response) {
        reject()
      } else {
        resolve(responseReducer(response))
      }
    })
  }

  return {
    get,
    getState: database.getState,
    setState: database.setState,
  }
}

export default createMoxie
