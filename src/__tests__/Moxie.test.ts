import createMoxie from '../createMoxie'
import faker from '../faker'
import createSchema from '../createSchema'

const errorResponse = {
  data: {},
  headers: {'Content-Type': 'application/json'},
  status: 400,
  statusText: 'Bad Request',
}

const UserSchema = createSchema({
  id: faker.random.uuid(),
  name: faker.name.firstName(),
})

describe('Initialize', () => {
  test('Can create a database without arguments', () => {
    const moxie = createMoxie()

    expect(moxie.get).toBeTruthy()
    expect(moxie.post).toBeTruthy()
    expect(moxie.name).toBe('MoxieDB')
    expect(moxie.schemas).toEqual({})
    expect(moxie.getState()).toEqual({})
  })

  test('Can set initialState', () => {
    const initialState = {
      users: UserSchema.generate(10),
    }

    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    const state = moxie.getState()

    expect(state).toBeTruthy()
    expect(state.users).toHaveLength(10)
  })
})

describe('get', () => {
  test('Can retrieve data from get("path/")', async () => {
    const initialState = {
      users: UserSchema.generate(10),
    }

    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    await moxie.get('/users').then(({data, status}) => {
      expect(status).toBe(200)
      expect(data).toBeTruthy()
      expect(data).toHaveLength(10)
    })
  })

  test('Can handle retrieving data that does not exist from get("path/")', () => {
    const initialState = {}
    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    expect(moxie.get('/nope')).rejects.toEqual(errorResponse)
  })

  test('Can retrieve data from get("path/:id")', async () => {
    const initialState = {
      users: [
        {
          id: '123',
          name: 'Randy Marsh',
        },
      ],
    }

    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    await moxie.get('/users/123').then(({data, status}) => {
      expect(status).toBe(200)
      expect(data.name).toBe('Randy Marsh')
    })
  })

  test('Can handle retrieving data that does not exist from get("path/:id")', () => {
    const initialState = {
      users: [
        {
          id: '123',
          name: 'Randy Marsh',
        },
      ],
    }

    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    expect(moxie.get('/users/nope')).rejects.toEqual(errorResponse)
  })

  test('Rejects if empty', () => {
    const moxie = createMoxie()

    // @ts-ignore
    expect(moxie.get()).rejects.toEqual(errorResponse)
  })
})

describe('post', () => {
  test('Can add an entry to a collection at route/', async () => {
    const initialState = {
      users: [],
    }
    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    // Generate the user
    await moxie.post('/users')

    await moxie.get('/users').then(({data, status}) => {
      expect(status).toBe(200)
      expect(data).toHaveLength(1)
    })
  })

  test('Can add an entry to a collection at route/id', async () => {
    const initialState = {
      users: [],
    }
    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    // Generate the user
    await moxie.post('/users/123', {
      id: '123',
      name: 'Stan Darsh',
    })

    await moxie.get('/users/123').then(({data, status}) => {
      expect(status).toBe(200)
      expect(data.name).toBe('Stan Darsh')
    })
  })

  test('Rejects if empty', () => {
    const moxie = createMoxie()

    // @ts-ignore
    expect(moxie.post()).rejects.toEqual(errorResponse)
  })
})

describe('put', () => {
  test('Can add an entry to a collection at route/', async () => {
    const initialState = {
      users: [],
    }
    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    // Generate the user
    await moxie.put('/users')

    await moxie.get('/users').then(({data, status}) => {
      expect(status).toBe(200)
      expect(data).toHaveLength(1)
    })
  })

  test('Can add an entry to a collection at route/id', async () => {
    const initialState = {
      users: [],
    }
    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    // Generate the user
    await moxie.put('/users/123', {
      id: '123',
      name: 'Stan Darsh',
    })

    await moxie.get('/users/123').then(({data, status}) => {
      expect(status).toBe(200)
      expect(data.name).toBe('Stan Darsh')
    })
  })

  test('Rejects if empty', () => {
    const moxie = createMoxie()

    // @ts-ignore
    expect(moxie.put()).rejects.toEqual(errorResponse)
  })
})

describe('patch', () => {
  test('Can add an entry to a collection at route/', async () => {
    const initialState = {
      users: [],
    }
    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    // Generate the user
    await moxie.patch('/users')

    await moxie.get('/users').then(({data, status}) => {
      expect(status).toBe(200)
      expect(data).toHaveLength(1)
    })
  })

  test('Can add an entry to a collection at route/id', async () => {
    const initialState = {
      users: [],
    }
    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    // Generate the user
    await moxie.patch('/users/123', {
      id: '123',
      name: 'Stan Darsh',
    })

    await moxie.get('/users/123').then(({data, status}) => {
      expect(status).toBe(200)
      expect(data.name).toBe('Stan Darsh')
    })
  })

  test('Rejects if empty', () => {
    const moxie = createMoxie()

    // @ts-ignore
    expect(moxie.patch()).rejects.toEqual(errorResponse)
  })
})

describe('delete', () => {
  test('Can delete an item from a collection', async () => {
    const initialState = {
      users: [
        {
          id: '123',
          name: 'Stan DARSH',
        },
      ],
    }
    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    await moxie.delete('/users/123')

    await moxie.get('/users').then(({data, status}) => {
      expect(status).toBe(200)
      expect(data).toHaveLength(0)
    })
  })

  test('Rejects if incorrect path', async () => {
    const initialState = {
      users: [
        {
          id: '123',
          name: 'Stan DARSH',
        },
      ],
    }
    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    expect(moxie.delete('/nope')).rejects.toEqual(errorResponse)
  })

  test('Rejects if no path', async () => {
    const initialState = {
      users: [
        {
          id: '123',
          name: 'Stan DARSH',
        },
      ],
    }
    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    // @ts-ignore
    expect(moxie.delete()).rejects.toEqual(errorResponse)
  })

  test('Rejects if incorrect ID', async () => {
    const initialState = {
      users: [
        {
          id: '123',
          name: 'Stan DARSH',
        },
      ],
    }
    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    expect(moxie.delete('/users/abc')).rejects.toEqual(errorResponse)
  })

  test('Can delete a collection', async () => {
    const initialState = {
      users: [
        {
          id: '123',
          name: 'Stan DARSH',
        },
      ],
    }
    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
    )

    await moxie.delete('/users')

    expect(moxie.get('/users')).rejects.toEqual(errorResponse)
  })
})

describe('responseReducer', () => {
  test('Can customize data', async () => {
    const spy = jest.fn()
    const initialState = {
      users: [],
    }
    const moxie = createMoxie(
      'users',
      {
        users: UserSchema,
      },
      initialState,
      {
        responseReducer: data => {
          spy(data)
          return {
            ...data,
            name: 'Stan DARSH',
          }
        },
      },
    )

    const newEntry = {
      id: '123',
      name: 'Stan Marsh',
    }

    // Generate the user
    await moxie.post('/users/123', newEntry)

    await moxie.get('/users/123').then(({data, status}) => {
      expect(status).toBe(200)
      expect(data.name).toBe('Stan DARSH')
    })

    expect(spy).toHaveBeenCalledWith(newEntry)
  })
})
