import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.transform()', () => {
  it('returns undefined when priority is true and all b keys exist in a', () => {
    // When priority=true and all keys in b already exist in a,
    // the resulting attributes object should be empty, so transform should return undefined.
    // Original: Object.keys(attributes).length > 0 ? attributes : undefined
    // Mutated:  Object.keys(attributes).length >= 0 ? attributes : undefined
    // The mutation causes an empty object {} to be returned instead of undefined.
    const a = { bold: true, color: 'red' };
    const b = { bold: false, color: 'blue' };
    const result = AttributeMap.transform(a, b, true);
    expect(result).toBeUndefined();
  });
});