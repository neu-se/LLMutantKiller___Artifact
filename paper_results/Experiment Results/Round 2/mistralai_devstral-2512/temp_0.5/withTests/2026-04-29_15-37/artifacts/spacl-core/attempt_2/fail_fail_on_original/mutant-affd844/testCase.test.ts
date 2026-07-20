import { Matcher } from '../src/matcher'

describe('Matcher', () => {
  it('should throw an error with a specific message for malformed captures', () => {
    expect(() => {
      new Matcher('/:foo:')
    }).toThrow('Path contains malformed captures')
  })
})