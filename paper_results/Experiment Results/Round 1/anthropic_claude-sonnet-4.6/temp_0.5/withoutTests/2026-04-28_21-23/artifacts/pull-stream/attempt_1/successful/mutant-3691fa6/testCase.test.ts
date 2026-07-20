import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js"

describe("prop utility function", () => {
  it("should return a function that extracts regex matches when given a RegExp object", () => {
    const regex = /hello/;
    const result = prop(regex);
    
    // In the original code, 'object' === typeof key handles RegExp (typeof /regex/ === 'object')
    // In the mutated code, 'object' !== typeof key would be false for RegExp, so it falls through to return key itself
    
    // The result should be a function (not the regex itself)
    expect(typeof result).toBe("function");
    
    // The function should extract the matched portion from a string
    const extractFn = result as (data: string) => string | null;
    expect(extractFn("say hello world")).toBe("hello");
    expect(extractFn("no match here")).toBeNull();
  });
});