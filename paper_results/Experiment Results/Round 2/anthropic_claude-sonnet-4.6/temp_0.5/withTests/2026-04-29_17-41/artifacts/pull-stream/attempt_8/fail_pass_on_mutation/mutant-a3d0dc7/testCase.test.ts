import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should return a callable read function when given a valid array", () => {
    // With mutation if(true), abortCb(cb, abort, onAbort) is called at factory time
    // where cb and abort are both undefined, which should throw
    expect(() => {
      const read = values([1, 2, 3], undefined);
      expect(typeof read).toBe("function");
    }).not.toThrow();
  });
});