import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when calling acosh with an empty string', () => {
    const complex = new Complex("");
    expect(() => complex.acosh()).toThrowError(SyntaxError);
  });
});