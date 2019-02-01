const {defaults: tsjPreset} = require('ts-jest/presets')
const jestConfig = require('@helpscout/zero/jest')

const coverageList = ['src/**/*.{js,jsx,ts,tsx}']

module.exports = Object.assign({}, jestConfig, {
  collectCoverageFrom: []
    .concat(jestConfig.collectCoverageFrom)
    .concat(coverageList),
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.js$': 'babel-jest',
    ...tsjPreset.transform,
  },
})
