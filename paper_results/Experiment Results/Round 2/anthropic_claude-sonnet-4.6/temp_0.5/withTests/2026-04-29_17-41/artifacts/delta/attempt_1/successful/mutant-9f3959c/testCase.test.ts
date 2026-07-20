import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose', () => {
  it('should not include keys from a where a[key] is undefined and b does not have the key', () => {
    const a: { [key: string]: unknown } = { bold: undefined };
    const b = {};
    // Original: a[key] !== undefined check fails, so 'bold' is not added -> result is undefined
    // Mutated: condition is true && b[key] === undefined, so attributes['bold'] = undefined -> result has 'bold' key
    const result = AttributeMap.compose(a, b);
    expect(result).toBeUndefined();
  });
});