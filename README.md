# 😘 Moxie

> Create client side mock API endpoints

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm install --save-dev @helpscout/moxie
```

## Usage

```js
import {createMoxie, createSchema, faker} from '@helpscout/moxie'

const UserSchema = createSchema({
  id: faker.random.uuid(),
  name: faker.name.firstName(),
})

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
    user: UserSchema,
  },
  initialState,
)

moxie.get('users/123').then(data => {
  console.log(data)
  // {
  //   id: '123',
  //   name: 'Randy Marsh',
  // }
})
```
