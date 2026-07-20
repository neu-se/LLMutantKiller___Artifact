import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return a function that executes the regexp on data when given a regexp key", () => {
    const regex = /hello/;
    const getter = prop(regex);
    
    // getter should be a function (not the key itself)
    expect(typeof getter).toBe("function");
    
    // The function should execute the regexp and return the match
    const result = getter("say hello world");
    expect(result).toBe("hello");
    
    // When no match, should return null
    const noMatch = getter("say goodbye world");
    expect(noMatch).toBeNull();
  });
});