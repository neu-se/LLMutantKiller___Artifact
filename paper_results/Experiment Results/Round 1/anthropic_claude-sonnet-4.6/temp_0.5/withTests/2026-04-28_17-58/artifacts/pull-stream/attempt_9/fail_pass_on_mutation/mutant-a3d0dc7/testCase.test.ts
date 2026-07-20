import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should not throw when creating source with onAbort callback", () => {
    const onAbort = jest.fn();
    
    // In original: if(abort) where abort=undefined → false, no throw, returns reader function
    // In mutated: if(true) → calls abortCb(undefined, undefined, onAbort) → tries to call cb(abort) where cb=undefined → throws TypeError
    expect(() => {
      values([1, 2, 3], onAbort);
    }).not.toThrow();
    
    expect(onAbort).not.toHaveBeenCalled();
  });
});