import AttributeMap from "../src/AttributeMap";

describe('AttributeMap.diff()', () => {
  it('should treat non-object b as empty object, returning null for all keys in a', () => {
    // When b is not an object, the original code sets b = {}
    // The mutated code leaves b as-is (non-object), which means b[key] will be undefined
    // for all keys, causing the diff to return null for each key in a
    // However, with the mutation, b remains a non-object (e.g., a string),
    // and accessing b[key] on a string may behave differently than on {}
    
    // The key difference: with original code, b becomes {}, so b[key] === undefined
    // and the diff correctly computes { bold: null, color: null }
    // With mutated code, b stays as the non-object value, but since we're accessing
    // properties on it, string/number primitives will have undefined for custom keys too
    // BUT the concat of Object.keys(a) and Object.keys(b) will differ:
    // Object.keys({}) === [] vs Object.keys(someNonObject) may throw or return []
    
    // Actually the real difference: if b is undefined (not an object), 
    // the original sets b = {}, but the mutation does NOT set b = {}
    // So b remains undefined, and accessing b[key] will throw a TypeError
    
    // Let's test with b as a non-object primitive that's not undefined
    // The function signature has a default of {}, so we need to pass an explicit non-object
    
    // We can call it with explicit arguments where b is a non-object non-undefined value
    // TypeScript types prevent this directly, so we cast
    const a = { bold: true, color: 'red' };
    
    // With original: b gets set to {}, so diff returns { bold: null, color: null }
    // With mutation: b stays as 'notAnObject' string
    //   Object.keys(a).concat(Object.keys('notAnObject')) - Object.keys on string returns char indices
    //   Then b[key] for 'bold' would be undefined on a string, so attrs['bold'] = null
    //   But Object.keys('notAnObject') returns ['0','1','2',...,'11'] (indices)
    //   And a['0'] === undefined, b['0'] === 'n', so they differ -> attrs['0'] = 'n'
    //   This means the result would include numeric string keys from the string's characters
    
    const result = AttributeMap.diff(a, 'notAnObject' as unknown as AttributeMap);
    
    // Original behavior: b = {}, result = { bold: null, color: null }
    // Mutated behavior: b stays 'notAnObject', result includes character indices
    expect(result).toEqual({ bold: null, color: null });
  });
});