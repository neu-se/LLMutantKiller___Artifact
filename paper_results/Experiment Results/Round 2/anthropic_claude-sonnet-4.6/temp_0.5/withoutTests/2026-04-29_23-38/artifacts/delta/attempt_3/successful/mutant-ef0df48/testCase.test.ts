import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should correctly compose when b is a string with enumerable indices", () => {
    // "abc" has indices 0,1,2 as enumerable properties
    // Original: inner if(typeof b !== 'object') sets b={}, so cloneDeep({})={}
    // Mutated: if(false) skips, so cloneDeep("abc") gives "abc" with Object.keys=["0","1","2"]
    const result = AttributeMap.compose({}, "abc" as any);
    expect(result).toBeUndefined();
  });
});