import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when calculating acoth with mutated code', () => {
    const complex = new Complex(1, 2);
    // Simulate the mutation by setting the 're' property to undefined
    complex["re"] = undefined;
    expect(() => complex.acoth()).toThrowError();
  });
});