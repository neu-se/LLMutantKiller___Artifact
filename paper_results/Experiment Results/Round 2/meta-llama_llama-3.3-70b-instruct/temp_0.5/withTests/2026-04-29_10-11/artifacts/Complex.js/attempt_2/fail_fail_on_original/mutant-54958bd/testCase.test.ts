import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex acosh and throw an error when accessing an empty property', () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(() => result[""]).toThrowError();
  });
});