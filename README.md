# 😘 Moxie

> Create client side mock API endpoints

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Thanks!](#thanks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm install --save-dev @helpscout/moxie
```

## Usage

```js
import {createMoxie, createSchema, faker} from '@helpscout/moxie'

// Define your schemas
const UserSchema = createSchema({
  id: faker.random.uuid(),
  name: faker.name.firstName(),
})

// Create some initial state
const initialState = {
  users: [
    {
      id: '123',
      name: 'Randy Marsh',
    },
  ],
}

// Create the mock database
const moxie = createMoxie(
  'users',
  {
    users: UserSchema,
  },
  initialState,
)

// Make the "get" request!
moxie.get('users/123').then(response => {
  console.log(response)
  // {
  //   status: 200,
  //   statusText: 'OK',
  //   data: {
  //     id: '123',
  //     name: 'Randy Marsh',
  //   },
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }
})
```

## Thanks!

Thanks to [lowdb](https://github.com/lowdb/lowdb) for the database set up and to [@jmauerhan](https://github.com/jmauerhan) for picking the 😘 emoji for Moxie!
