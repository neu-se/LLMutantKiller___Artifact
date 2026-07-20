import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh', () => {
    const complex = new Complex(1, 0);
    const result = complex.cosh();
    expect(Object.keys(result)).toHaveLength(2);
    expect(Object.keys(result)).toEqual(['re', 'im']);
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(result.constructor.name).toBe('Complex');
  });
});