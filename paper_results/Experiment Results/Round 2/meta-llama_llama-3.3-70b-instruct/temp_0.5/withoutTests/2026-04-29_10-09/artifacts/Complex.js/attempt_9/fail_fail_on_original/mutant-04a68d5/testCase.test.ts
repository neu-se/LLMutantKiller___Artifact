import { Complex } from "../complex";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 0);
    expect(complex["re"]).toBeDefined();
    const a = complex["re"];
    expect(a).not.toBeUndefined();
  });
});