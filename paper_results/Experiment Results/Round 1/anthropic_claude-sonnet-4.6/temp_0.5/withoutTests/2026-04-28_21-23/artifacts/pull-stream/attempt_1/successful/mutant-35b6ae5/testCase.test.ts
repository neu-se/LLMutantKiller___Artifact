import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js"

describe("prop with regexp key", () => {
  it("should return null/undefined when regexp does not match, not the result of v[0] on null", () => {
    const regexp = /hello/;
    const fn = prop(regexp);
    
    // When the regexp does NOT match, key.exec(data) returns null
    // Original: v && v[0] => null && null[0] => null (falsy, short-circuits)
    // Mutated:  v || v[0] => null || null[0] => throws TypeError or returns undefined
    
    // Test with non-matching string - original returns null, mutated throws
    const nonMatchingData = "world";
    
    // Original code: v = null, returns null && null[0] = null
    // Mutated code: v = null, returns null || null[0] which throws TypeError
    
    let result: any;
    let threw = false;
    try {
      result = fn(nonMatchingData);
    } catch (e) {
      threw = true;
    }
    
    // Original: should not throw, should return null
    // Mutated: should throw TypeError (cannot read property '0' of null)
    expect(threw).toBe(false);
    expect(result).toBeFalsy();
  });
});