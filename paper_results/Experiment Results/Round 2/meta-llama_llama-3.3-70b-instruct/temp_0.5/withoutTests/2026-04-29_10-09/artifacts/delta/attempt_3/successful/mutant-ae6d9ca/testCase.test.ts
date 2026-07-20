import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap', () => {
  it('should handle non-object input correctly in diff function', () => {
    const a = 'string';
    const b = { foo: 'bar' };
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ foo: 'bar' });
  });
});