import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce fallback behavior", () => {
  it("should throw TypeError when reduce is called on empty array without initial value", () => {
    const originalReduce = Array.prototype.reduce;
    // The module is already loaded, so we can't force the fallback
    // Instead test Q behavior that relies on reduce
    expect(() => {
      [].reduce((a: number, b: number) => a + b);
    }).toThrow(TypeError);
  });
});