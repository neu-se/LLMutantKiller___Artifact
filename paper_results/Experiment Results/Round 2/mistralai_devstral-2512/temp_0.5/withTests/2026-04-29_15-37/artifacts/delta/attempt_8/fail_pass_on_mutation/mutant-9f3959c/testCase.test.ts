import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should preserve b[key] when a[key] is undefined', () => {
    const a = { key1: undefined };
    const b = { key1: 'should_preserve', key2: 'should_keep' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ key1: 'should_preserve', key2: 'should_keep' });
  });
});