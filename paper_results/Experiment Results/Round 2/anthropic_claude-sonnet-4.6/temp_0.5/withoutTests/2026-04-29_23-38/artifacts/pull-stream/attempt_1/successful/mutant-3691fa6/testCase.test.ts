import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js"

describe("prop utility function", () => {
  it("should return a function that uses regex exec when given a RegExp object", () => {
    const regex = /hello/;
    const result = prop(regex);
    
    // In original code: 'object' === typeof key && 'function' === typeof key.exec
    // typeof /hello/ === 'object', so this condition is true
    // The function should return a function that uses regex.exec
    
    expect(typeof result).toBe("function");
    
    // The returned function should use regex exec on the data
    const matchResult = result("hello world");
    expect(matchResult).toBe("hello");
    
    const noMatchResult = result("goodbye world");
    expect(noMatchResult).toBeNull();
  });
});