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
})
