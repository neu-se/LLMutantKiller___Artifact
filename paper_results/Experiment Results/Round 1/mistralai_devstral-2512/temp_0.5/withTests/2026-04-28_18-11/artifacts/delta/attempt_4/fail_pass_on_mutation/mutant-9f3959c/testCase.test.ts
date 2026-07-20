import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should only copy attributes from a when b has undefined values and a has null values', () => {
    const a = { bold: null, color: 'red' };
    const b = { bold: undefined, italic: true };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ bold: null, color: 'red', italic: true });
  });
});