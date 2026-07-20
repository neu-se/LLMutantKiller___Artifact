import { Complex } from "./complex";

describe('Complex', () => {
  it('should throw an error when b is zero in acsch for mutated code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).toThrowError();
  });
});