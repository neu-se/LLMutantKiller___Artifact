import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should throw an error when acosh is called on the mutated code', () => {
    const c = new Complex(2, 0);
    expect(() => {
      const result = c.acosh();
      if (result === undefined) {
        throw new Error('acosh function returned undefined');
      }
    }).toThrowError('acosh function returned undefined');
  });
});