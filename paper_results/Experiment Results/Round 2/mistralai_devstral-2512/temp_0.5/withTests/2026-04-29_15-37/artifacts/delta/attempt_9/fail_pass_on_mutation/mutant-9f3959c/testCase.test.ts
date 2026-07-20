import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should not overwrite b[key] when a[key] is undefined', () => {
    const a = { key1: undefined, key2: 'value2' };
    const b = { key1: 'keep_this', key3: 'value3' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ key1: 'keep_this', key2: 'value2', key3: 'value3' });
  });
});