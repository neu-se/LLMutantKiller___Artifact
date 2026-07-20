import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.diff()', () => {
  it('should handle non-object b parameter', () => {
    const a = { color: 'red', bold: true };
    const b = "not an object";
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ color: null, bold: null });
  });
});