import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should preserve b[key] when a[key] is undefined and b[key] is defined', () => {
    const a = { key1: undefined, key2: 'value2' };
    const b = { key1: 'should_keep', key3: 'value3' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ key1: 'should_keep', key2: 'value2', key3: 'value3' });
  });
});