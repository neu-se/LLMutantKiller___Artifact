import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when parsing an invalid complex number', () => {
    expect(() => new Complex('5+')).toThrowError();
  });
});