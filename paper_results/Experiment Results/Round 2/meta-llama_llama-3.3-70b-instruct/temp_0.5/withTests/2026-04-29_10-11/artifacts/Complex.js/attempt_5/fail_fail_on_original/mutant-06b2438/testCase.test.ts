import { Complex } from "./complex";

describe('Complex', () => {
  it('should throw an error when calling acosh with invalid method', () => {
    const complex = new Complex(2, 0);
    expect(() => complex[""]()).toThrowError();
  });
});