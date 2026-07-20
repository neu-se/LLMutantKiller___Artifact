import * as ComplexModule from "./complex.js";

describe('Complex', () => {
  it('should not have an empty string key', () => {
    const keys = Object.keys(ComplexModule);
    expect(keys.includes("")).toBe(false);
  });
});