import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return the matched string from exec, not true", () => {
    const regexp = /hello/;
    const fn = prop(regexp);
    
    const data = "say hello world";
    const result = fn(data);
    
    // Original: returns v[0] which is "hello"
    // Mutated: returns true
    expect(result).toBe("hello");
    expect(result).not.toBe(true);
  });
});