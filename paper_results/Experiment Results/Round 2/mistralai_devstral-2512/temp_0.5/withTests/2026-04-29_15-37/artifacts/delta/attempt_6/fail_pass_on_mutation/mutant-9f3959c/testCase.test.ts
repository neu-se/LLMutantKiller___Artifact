import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should handle undefined in a correctly when b has same key', () => {
    const a = { key1: undefined, key2: 'value2' };
    const b = { key1: 'original', key3: 'value3' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ key1: 'original', key2: 'value2', key3: 'value3' });
  });
});