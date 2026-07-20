import AttributeMap from "../src/AttributeMap";

describe('AttributeMap.transform()', () => {
  it('returns undefined when priority is true and all b keys already exist in a', () => {
    // When priority=true and all keys in b already exist in a,
    // the resulting attributes object should be empty (length === 0),
    // so the function should return undefined.
    // With the mutation (>= instead of >), even an empty attributes object
    // would be returned instead of undefined.
    const a = { bold: true, color: 'red' };
    const b = { bold: false, color: 'blue' };
    const result = AttributeMap.transform(a, b, true);
    expect(result).toBeUndefined();
  });
});