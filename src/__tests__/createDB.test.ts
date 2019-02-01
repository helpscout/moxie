import createDB from '../createDB'

const initialState = {
  users: [
    {id: 0, name: 'Stan'},
    {id: 1, name: 'Kyle'},
    {id: 2, name: 'Kenny'},
    {id: 3, name: 'Cartman'},
  ],
}

describe('Instantiation', () => {
  test('Can create a basic database', () => {
    const db = createDB('users')
    db.defaults(initialState).write()

    expect(db.get('users').value()).toHaveLength(4)
  })
})

describe('get', () => {
  test('Can find an item based on id', () => {
    const db = createDB('users')
    db.defaults(initialState).write()

    const entry = db
      .get('users')
      .find({id: 1})
      .value().name

    expect(entry).toBe('Kyle')
  })

  test('Can find an item based on prop', () => {
    const db = createDB('users')
    db.defaults(initialState).write()

    const entry = db
      .get('users')
      .find({name: 'Kyle'})
      .value().name

    expect(entry).toBe('Kyle')
  })
})

describe('write', () => {
  test('Can update an entry', () => {
    const db = createDB('users')
    db.defaults(initialState).write()

    db.get('users')
      .find({name: 'Kenny'})
      .assign({name: 'Tweak'})
      .write()

    const oldEntry = db
      .get('users')
      .find({name: 'Kenny'})
      .value()

    const newEntry = db
      .get('users')
      .find({name: 'Tweak'})
      .value()

    expect(oldEntry).toBeFalsy()
    expect(newEntry).toBeTruthy()
  })
})

describe('remove', () => {
  test('Can remove an entry', () => {
    const db = createDB('users')
    db.defaults(initialState).write()

    // Oh my god! They killed Kenny!!!
    db.get('users')
      .remove({name: 'Kenny'})
      .write()

    const entry = db
      .get('users')
      .find({name: 'Kenny'})
      .value()

    expect(entry).toBeFalsy()
  })
})
