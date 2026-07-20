import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate atanh correctly for a = -1', () => {
    const complex = new Complex(-1, 0);
    expect(() => complex.atanh()).toThrowError();
  });
});