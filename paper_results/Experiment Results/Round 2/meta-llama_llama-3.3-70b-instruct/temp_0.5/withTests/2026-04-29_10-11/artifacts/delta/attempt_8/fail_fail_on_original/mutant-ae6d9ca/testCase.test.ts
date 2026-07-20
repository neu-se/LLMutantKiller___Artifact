import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle non-object input correctly', () => {
    const a = { test: 'test' };
    const b = { bold: true };
    expect(AttributeMap.diff(a, b)).toEqual({ bold: true });
  });
});