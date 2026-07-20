import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should not overwrite b[key] when a[key] is undefined', () => {
    const a = { key1: 'value1', key2: undefined };
    const b = { key1: 'value1_overridden', key2: 'value2' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ key1: 'value1_overridden', key2: 'value2' });
  });
});