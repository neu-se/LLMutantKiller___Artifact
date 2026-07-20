const tester = require("../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js");

describe("tester with regexp-like object", () => {
  it("should use test.test method when given an object with a test function (like a RegExp)", () => {
    const regexp = /hello/;
    const testerFn = tester(regexp);
    
    // With original code: 'object' === typeof regexp && 'function' === typeof regexp.test
    // is true, so testerFn = function(data) { return regexp.test(data) }
    // With mutated code: false, so it falls through to prop(test) || id
    // which would not call regexp.test correctly
    
    expect(testerFn("hello world")).toBe(true);
    expect(testerFn("goodbye")).toBe(false);
  });
});