import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should return a function when given a valid array", () => {
    const result = values([1, 2, 3]);
    // In original: if(abort) is false (abort=undefined), so we reach 'return function(abort, cb){...}'
    // In mutated: if(true) returns abortCb(undefined, undefined, undefined) which may return undefined
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe("function");
    expect(result.length).toBe(2);
  });
});