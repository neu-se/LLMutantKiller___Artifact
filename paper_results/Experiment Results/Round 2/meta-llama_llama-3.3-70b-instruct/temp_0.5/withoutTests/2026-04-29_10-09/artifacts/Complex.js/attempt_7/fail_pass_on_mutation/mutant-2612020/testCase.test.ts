import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly handle the case when parsing a string', () => {
    const complex = new Complex('1+2i');
    const keys = Object.keys(complex);
    expect(keys.length).toBe(2);
    expect(keys).toContain('re');
    expect(keys).toContain('im');
    expect(complex['re']).toBe(1);
    expect(complex['im']).toBe(2);
  });
});