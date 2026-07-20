import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not throw an error when accessing properties', () => {
    const complex = new Complex(1, 2);
    expect(() => {
      complex['re'];
      complex['im'];
    }).not.toThrow();
    expect(complex['re']).not.toBeUndefined();
    expect(complex['im']).not.toBeUndefined();
    expect(() => {
      complex[''];
    }).toThrow();
  });
});