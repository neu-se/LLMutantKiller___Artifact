import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus cosecans correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result.toString()).not.toBe(new Complex(1, 2).acsc().toString());
  });
});