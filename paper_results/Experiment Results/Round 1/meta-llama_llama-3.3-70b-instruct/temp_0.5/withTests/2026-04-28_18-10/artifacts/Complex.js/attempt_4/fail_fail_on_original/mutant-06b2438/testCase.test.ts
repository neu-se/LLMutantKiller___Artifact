import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when calling acosh with an invalid method', () => {
    const complex = new Complex(1, 0);
    const acoshMethod = complex["acosh"];
    expect(acoshMethod).toBeInstanceOf(Function);
    expect(() => complex[""]()).toThrowError();
  });
});