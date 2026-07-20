import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when trying to access an undefined property', () => {
    const complex = new Complex(1, 1);
    expect(() => complex[""]).toThrowError();
  });
});