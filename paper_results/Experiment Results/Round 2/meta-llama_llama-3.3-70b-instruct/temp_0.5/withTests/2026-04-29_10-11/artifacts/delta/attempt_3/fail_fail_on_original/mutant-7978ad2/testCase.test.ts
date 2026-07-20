import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle b that is null', () => {
    const a = { bold: true, color: 'red' };
    const b = null;
    const expected = { bold: null, color: null };
    expect(AttributeMap.diff(a, b)).toEqual(expected);
  });
});