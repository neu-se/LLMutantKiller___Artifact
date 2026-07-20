import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js"

describe("prop with regexp key", () => {
  it("should return null/undefined when regexp does not match, not the match array", () => {
    const regexp = /hello/;
    const fn = prop(regexp);
    
    // When the regexp does NOT match, key.exec(data) returns null
    // Original: return v && v[0] => returns null (falsy v short-circuits)
    // Mutated:  return v || v[0] => tries to access v[0] on null => throws TypeError
    // OR if data matches: original returns v[0] (the matched string), mutated returns v (the array)
    
    // Test case where regexp does NOT match - original returns null, mutated throws
    const noMatchResult = fn("world");
    expect(noMatchResult).toBeNull();
    
    // Test case where regexp DOES match
    // Original: returns v[0] (the string "hello")
    // Mutated: returns v (the RegExpExecArray), which is truthy but !== "hello"
    const matchResult = fn("say hello there");
    expect(matchResult).toBe("hello");
  });
});