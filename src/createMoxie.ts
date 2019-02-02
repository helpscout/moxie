import * as Pattern from 'url-pattern'
import createDB from './createDB'
import {createStatus200, createStatus400} from './responses'
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
        reject(createStatus400())
      } else {
        resolve(createStatus200(responseReducer(response)))
      }
    })
  }

  function post(path: Path, props?: any) {
    const pattern = new Pattern(`/:route(/:id)`).match(path) || {}
    const {route, id} = pattern
    let response

    if (!route && !id) {
      return Promise.reject()
    }

    response = id && props

    if (id) {
      const {id: propsId, ...rest} = props

      if (database.has(`${route}.${id}`).value()) {
        database.set(`${route}.${id}`, props).write()
      } else {
        database
          .get(route)
          .push(props)
          .write()
      }
    } else if (schemas[route]) {
      response = schemas[route].generate()

      database
        .get(route)
        .push(response)
        .write()
    }

    return new Promise((resolve, reject) => {
      if (!response) {
        reject(createStatus400())
      } else {
        resolve(createStatus200(responseReducer(response)))
      }
    })
  }

  return {
    get,
    post,
    getState: database.getState,
    setState: database.setState,
  }
}

export default createMoxie
