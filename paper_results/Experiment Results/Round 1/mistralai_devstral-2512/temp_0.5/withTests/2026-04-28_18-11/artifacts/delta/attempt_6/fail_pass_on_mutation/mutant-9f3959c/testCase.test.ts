import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should handle case where a has undefined values and b has defined values', () => {
    const a = { bold: undefined, color: 'red' };
    const b = { bold: true };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ bold: true, color: 'red' });
  });
});