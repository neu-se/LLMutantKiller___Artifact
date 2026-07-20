import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should return a function that accepts two arguments (the read function) when given valid array", () => {
    const read = values([1, 2, 3], undefined);
    // With mutation, values() returns abortCb(undefined, undefined, undefined)
    // which is likely undefined, not a function with length 2
    expect(typeof read).toBe("function");
    expect(read.length).toBe(2);
  });
});