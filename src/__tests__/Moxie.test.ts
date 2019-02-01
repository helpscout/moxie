import createMoxie from '../createMoxie'
import faker from '../faker'
import createSchema from '../createSchema'

const UserSchema = createSchema({
  id: faker.random.uuid(),
  name: faker.name.firstName(),
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

  await moxie.get('/users').then(data => {
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

  expect(moxie.get('/nope')).rejects.toEqual(undefined)
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

  await moxie.get('/users/123').then(data => {
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

  expect(moxie.get('/users/nope')).rejects.toEqual(undefined)
})
