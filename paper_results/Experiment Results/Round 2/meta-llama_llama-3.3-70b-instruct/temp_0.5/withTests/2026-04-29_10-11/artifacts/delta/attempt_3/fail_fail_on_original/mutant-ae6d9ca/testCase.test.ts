import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle non-object input correctly', () => {
    const a = 'string';
    const b = { bold: true };
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ bold: true, [a]: null });
  });
});