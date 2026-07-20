import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.diff()', () => {
  it('handles non-object b parameter', () => {
    const a = { bold: true, color: 'red' };
    const b = "not an object";
    const result = AttributeMap.diff(a, b as any);
    expect(result).toEqual({ bold: null, color: null });
  });
});