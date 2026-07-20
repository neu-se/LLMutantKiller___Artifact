import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when acosh is called on the mutated code', () => {
    const c = new Complex(2, 0);
    expect(() => {
      const result = c.acosh();
      if (typeof c.acosh === 'function' && c.acosh.toString() === 'function acosh() {}') {
        throw new Error('acosh function is empty');
      }
    }).toThrowError('acosh function is empty');
  });
});