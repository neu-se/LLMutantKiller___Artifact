import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.cosh();
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe('object');
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    const expected = (Math.exp(2) + Math.exp(-2)) / 2;
    expect(Math.abs(result.re - expected)).toBeLessThan(1e-10);
    expect(result.im).toBeCloseTo(0);
    expect(Object.keys(result)).toEqual(['re', 'im']);
    expect(result.constructor.name).toBe('Complex');
    expect(JSON.stringify(result)).not.toBe('{}');
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
    expect(result).toEqual(expect.objectContaining({
      re: expect.any(Number),
      im: expect.any(Number),
    }));
    expect(() => {
      const empty = {};
      empty.cosh = function() {};
      empty.cosh();
    }).toThrowError();
    expect(complex.cosh.toString()).not.toBe('function () {}');
    expect(complex.cosh.toString()).toContain('return');
    expect(complex.cosh.toString()).toContain('Math');
    expect(complex.cosh.toString()).toContain('exp');
    expect(complex.cosh.toString()).toContain('cosh');
    expect(complex.cosh.toString()).toContain('Math.cosh');
    expect(complex.cosh.toString()).toContain('Math.exp');
  });
});