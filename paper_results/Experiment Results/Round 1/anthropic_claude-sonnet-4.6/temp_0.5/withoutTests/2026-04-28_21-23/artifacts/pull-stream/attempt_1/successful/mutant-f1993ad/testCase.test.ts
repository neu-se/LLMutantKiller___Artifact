import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js"

describe("prop with regexp key", () => {
  it("should return a function that uses regexp exec when key is a regexp", () => {
    const regexp = /hello/;
    const result = prop(regexp);
    
    // In original code, when key is a regexp (object with exec function),
    // it returns a function that calls key.exec(data) and returns v && v[0]
    // In mutated code, the regexp branch is replaced with `false`,
    // so it falls through to return `key` itself (the regexp object)
    
    // The result should be a function (not the regexp itself)
    expect(typeof result).toBe("function");
    
    // The function should apply the regexp to data
    const fn = result as (data: string) => string | null;
    expect(fn("say hello world")).toBe("hello");
    expect(fn("no match here")).toBeNull();
  });
});