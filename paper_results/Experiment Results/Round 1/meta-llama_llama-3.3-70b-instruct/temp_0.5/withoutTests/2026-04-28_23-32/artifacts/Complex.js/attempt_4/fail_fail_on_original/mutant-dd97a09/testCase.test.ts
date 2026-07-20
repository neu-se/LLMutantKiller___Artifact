import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should return a non-undefined value when calling sech', () => {
    const complex = new Complex(1, 2);
    expect(complex.sech()).not.toBeUndefined();
  });
});