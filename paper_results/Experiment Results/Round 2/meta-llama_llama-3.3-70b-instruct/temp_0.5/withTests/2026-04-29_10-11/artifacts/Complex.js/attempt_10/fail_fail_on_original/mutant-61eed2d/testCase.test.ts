import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when trying to access a property that does not exist', () => {
    const complex = new Complex('1+2i');
    expect(() => complex['nonExistentProperty']).toThrowError();
  });
});