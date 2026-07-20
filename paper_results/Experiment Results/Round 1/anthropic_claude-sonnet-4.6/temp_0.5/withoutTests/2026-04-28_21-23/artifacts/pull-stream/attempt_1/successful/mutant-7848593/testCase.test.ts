import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js"

describe("prop utility with regexp key", () => {
  it("should return a function that executes the regexp against data when key is a RegExp", () => {
    const regex = /hello/;
    const fn = prop(regex);
    
    // In original code: 'object' === typeof key && 'function' === typeof key.exec
    // This is true for RegExp, so fn should be a function that calls key.exec(data)
    // In mutated code: 'object' === typeof key && "" === typeof key.exec
    // "" === typeof key.exec is false (typeof key.exec is "function"), so fn would be key itself (the regex)
    
    expect(typeof fn).toBe("function");
    
    const result = fn("hello world");
    expect(result).toBe("hello");
    
    const noMatch = fn("goodbye world");
    expect(noMatch).toBeNull();
  });
});