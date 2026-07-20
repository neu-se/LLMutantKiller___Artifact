import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js"

describe("tester with regexp", () => {
  it("should use test.test method when test is an object with a function test property (like a RegExp)", () => {
    const regex = /hello/;
    const testerFn = tester(regex);
    
    // With original code: 'object' === typeof regex && 'function' === typeof regex.test
    // This is true, so testerFn = function(data) { return regex.test(data) }
    // With mutated code: 'object' === typeof regex && "" === typeof regex.test
    // "" === typeof regex.test is false (typeof regex.test is "function"), so it falls through to prop/id
    
    expect(testerFn("hello world")).toBe(true);
    expect(testerFn("goodbye")).toBe(false);
  });
});