import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle b that is not an object', () => {
    const a = { bold: true, color: 'red' };
    const b = 'not an object';
    expect(() => AttributeMap.diff(a, b)).toThrowError();
  });
});