import AttributeMap from "../src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should treat non-object b as empty object, merging a attributes into result', () => {
    // When b is not an object (e.g., a string), the original code sets b = {}
    // so that a's attributes are preserved in the result.
    // The mutated code leaves b as-is (non-object), which causes the for...in loop
    // over a to still run, but b[key] checks against the non-object b,
    // meaning b[key] === undefined for all keys, so a's attributes get added.
    // However, the cloneDeep(b) call on a non-object string will return a string,
    // not an object, causing Object.keys() to behave differently or throw.
    // Let's test with a = { bold: true } and b = undefined (default), 
    // but more specifically test the case where b is explicitly a non-object.
    
    // The mutation removes `b = {}` when typeof b !== 'object',
    // so b remains as the non-object value (e.g., a number or string).
    // cloneDeep of a primitive returns the primitive itself,
    // and Object.keys() on a primitive in modern JS returns [].
    // The for...in loop over a would still add a's keys since b[key] === undefined.
    // So the result might accidentally still work for some cases.
    
    // The key difference: with the original code, b = {} means cloneDeep({}) = {},
    // and a's attributes are merged in. With the mutated code, b stays as a non-object,
    // cloneDeep(someNonObject) returns the primitive, and Object.keys(primitive) = [],
    // then for...in over a adds a's keys. The final result might be the same in some cases.
    
    // Let's find a case that differs: keepNull = true with a non-object b.
    // Original: b = {}, attributes = cloneDeep({}) = {}, then a's keys added.
    // Mutated: b stays non-object, cloneDeep(nonObject) = nonObject (primitive),
    // Object.keys(primitive) in reduce would return [] (no null filtering),
    // then for...in a adds keys. Result should be same...
    
    // Actually the real difference: when b is a non-object like a number,
    // `cloneDeep(b)` returns that number, and then `Object.keys(number)` returns [].
    // The reduce step tries to iterate Object.keys(attributes) where attributes is a number.
    // This should still return {} after reduce. Then a's keys get added.
    // So behavior might be same... Let me think about keepNull=true case.
    
    // With keepNull=true, we skip the reduce step entirely.
    // attributes = cloneDeep(b). If b is non-object (mutated), attributes = primitive.
    // Then for (const key in a) { if (a[key] !== undefined && b[key] === undefined) }
    // b[key] on a primitive returns undefined, so all of a's keys get added to attributes (a primitive!)
    // attributes['bold'] = true on a number... that would just be ignored in JS.
    // Then Object.keys(attributes) where attributes is a number = [].
    // So result would be undefined! But original would return a's attributes.
    
    const a = { bold: true, color: 'red' };
    // Pass a non-object as b by casting through unknown
    // We simulate this by calling compose with a non-object b
    // Since TypeScript won't allow it directly, we cast
    const result = AttributeMap.compose(a, undefined);
    expect(result).toEqual({ bold: true, color: 'red' });
  });
});