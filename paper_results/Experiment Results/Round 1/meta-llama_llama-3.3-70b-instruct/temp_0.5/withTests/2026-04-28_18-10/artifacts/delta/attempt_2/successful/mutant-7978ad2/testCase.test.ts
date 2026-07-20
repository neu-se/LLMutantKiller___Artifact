import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff function should return the correct result when b is not an object', () => {
    const a = { bold: true, color: 'red' };
    const b = 'not an object';
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ bold: null, color: null });
  });
});