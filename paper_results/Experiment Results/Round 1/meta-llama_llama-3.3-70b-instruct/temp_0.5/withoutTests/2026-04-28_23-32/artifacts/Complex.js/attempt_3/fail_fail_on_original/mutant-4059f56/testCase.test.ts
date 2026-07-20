import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should throw an error when cloning with undefined property", () => {
    const complex = new Complex(1, 2);
    const cloned = complex.clone();
    expect(() => {
      cloned[""];
    }).not.toThrow();
    complex["re"] = undefined;
    const mutatedCloned = complex.clone();
    expect(() => {
      mutatedCloned[""];
    }).toThrow();
  });
});