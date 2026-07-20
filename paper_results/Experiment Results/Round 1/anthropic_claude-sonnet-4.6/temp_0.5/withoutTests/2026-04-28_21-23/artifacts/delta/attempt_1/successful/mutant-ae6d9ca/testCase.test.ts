import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts"

describe('AttributeMap.diff', () => {
  it('should handle non-object a by treating it as empty object', () => {
    // When a is not an object (e.g., a string), the original code resets a to {}
    // The mutated code does NOT reset a to {}, causing Object.keys(a) to return
    // character indices for strings, producing different results
    const a = 'hello' as unknown as AttributeMap;
    const b = { bold: true };
    
    // In original: a becomes {}, so diff only sees keys from b -> { bold: true }
    // In mutated: a stays 'hello', Object.keys('hello') = ['0','1','2','3','4']
    // which get included in the reduce, producing extra null entries
    const result = AttributeMap.diff(a as any, b);
    
    expect(result).toEqual({ bold: true });
  });
});