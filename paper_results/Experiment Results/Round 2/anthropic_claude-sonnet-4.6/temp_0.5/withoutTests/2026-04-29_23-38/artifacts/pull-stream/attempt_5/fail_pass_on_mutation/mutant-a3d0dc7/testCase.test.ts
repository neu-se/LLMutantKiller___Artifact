import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("should return a function when called with an array", () => {
    // In original code, the outer function returns the inner source function
    // In mutated code, if(true) calls abortCb(cb, abort, onAbort) where cb=undefined (outer params)
    // and then returns undefined instead of the inner function
    const source = values([1, 2, 3]);
    
    expect(typeof source).toBe("function");
  });
});