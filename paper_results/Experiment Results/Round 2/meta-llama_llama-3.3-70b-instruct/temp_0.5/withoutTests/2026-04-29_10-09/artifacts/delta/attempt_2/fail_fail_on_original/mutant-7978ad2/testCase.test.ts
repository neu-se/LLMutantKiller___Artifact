import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should handle non-object input correctly in diff function', () => {
    const a = { foo: 'bar' };
    const b = null;
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ foo: null });
  });
});