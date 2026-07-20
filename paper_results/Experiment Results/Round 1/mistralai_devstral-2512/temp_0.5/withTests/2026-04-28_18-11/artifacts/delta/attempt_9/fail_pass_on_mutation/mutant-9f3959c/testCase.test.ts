import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should not overwrite defined attributes in a when b has undefined values with keepNull true', () => {
    const a = { bold: true, color: 'red' };
    const b = { bold: undefined, italic: true };
    const result = AttributeMap.compose(a, b, true);
    expect(result).toEqual({ bold: true, color: 'red', italic: true });
  });
});