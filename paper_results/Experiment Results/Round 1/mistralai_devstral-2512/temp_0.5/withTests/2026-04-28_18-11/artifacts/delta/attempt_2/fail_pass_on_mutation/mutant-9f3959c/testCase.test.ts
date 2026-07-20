import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should preserve attributes from a when b has undefined values', () => {
    const a = { bold: true, color: 'red' };
    const b = { bold: undefined, italic: true };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ bold: true, color: 'red', italic: true });
  });
});