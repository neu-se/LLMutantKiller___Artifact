import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should preserve null values from a when b has undefined', () => {
    const a = { bold: null, color: 'red' };
    const b = { bold: undefined };
    const result = AttributeMap.compose(a, b, true);
    expect(result).toEqual({ bold: null, color: 'red' });
  });
});