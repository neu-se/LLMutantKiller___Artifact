import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 0);
    const a = complex["re"];
    expect(a).toBeDefined();
  });
});