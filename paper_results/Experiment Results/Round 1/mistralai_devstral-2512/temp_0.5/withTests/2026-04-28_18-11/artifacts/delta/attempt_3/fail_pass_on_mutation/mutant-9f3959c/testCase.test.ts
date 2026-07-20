import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should only copy attributes from a when b has undefined values', () => {
    const a = { bold: true, color: 'red', size: '12px' };
    const b = { color: undefined, italic: true };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ bold: true, color: 'red', size: '12px', italic: true });
  });
});