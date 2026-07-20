import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should throw an error when calling sech on the mutated code', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.sech()).toThrow();
  });
});