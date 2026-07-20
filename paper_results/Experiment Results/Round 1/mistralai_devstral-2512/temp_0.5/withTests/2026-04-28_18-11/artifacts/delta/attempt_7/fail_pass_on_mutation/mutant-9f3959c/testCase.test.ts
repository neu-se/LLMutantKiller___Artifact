import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should not copy undefined values from a to result when b has undefined', () => {
    const a = { bold: undefined, color: 'red' };
    const b = { bold: undefined };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ color: 'red' });
  });
});