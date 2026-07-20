import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should not overwrite b[key] when a[key] is undefined and b[key] is defined', () => {
    const a = { key1: undefined };
    const b = { key1: 'original_value' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ key1: 'original_value' });
  });
});