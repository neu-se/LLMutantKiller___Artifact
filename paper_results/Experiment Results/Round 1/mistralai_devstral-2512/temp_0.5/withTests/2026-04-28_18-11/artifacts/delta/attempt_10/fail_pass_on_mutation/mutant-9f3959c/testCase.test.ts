import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should handle case where a has defined value and b has undefined with keepNull false', () => {
    const a = { bold: true, color: 'red' };
    const b = { bold: undefined, italic: true };
    const result = AttributeMap.compose(a, b, false);
    expect(result).toEqual({ bold: true, color: 'red', italic: true });
  });
});