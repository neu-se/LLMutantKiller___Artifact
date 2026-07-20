import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with RegExp key", () => {
  it("should return a function that executes the regex on data and returns the match", () => {
    const regex = /hello/;
    const getter = prop(regex);
    
    // In original code: typeof key === 'object' && typeof key.exec === 'function' is true for RegExp
    // So getter should be a function that calls key.exec(data) and returns v[0]
    // In mutated code: "" === typeof key is never true, so getter falls through to `: key`
    // meaning getter would be the regex itself, not a function
    
    expect(typeof getter).toBe("function");
    
    const result = getter("say hello world");
    expect(result).toBe("hello");
    
    const noMatch = getter("say goodbye world");
    expect(noMatch).toBeNull();
  });
});