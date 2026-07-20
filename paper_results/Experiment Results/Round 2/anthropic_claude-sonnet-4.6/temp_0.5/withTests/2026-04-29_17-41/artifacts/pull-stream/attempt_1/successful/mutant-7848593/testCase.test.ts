import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return a function that applies regexp.exec when given a regexp key", () => {
    const regex = /hello/;
    const fn = prop(regex);
    
    // With original code: 'object' === typeof key && 'function' === typeof key.exec
    // typeof regex.exec === 'function', so this should be true and return a function
    // With mutated code: 'object' === typeof key && "" === typeof key.exec
    // typeof regex.exec === 'function' !== "", so this should be false and return key itself
    
    expect(typeof fn).toBe("function");
    
    const result = fn("hello world");
    expect(result).toBe("hello");
  });
});