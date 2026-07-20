import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle b that is not an object', () => {
    const a = { bold: true, color: 'red' };
    const b = { bold: true, color: 'red' };
    const expected = undefined;
    expect(AttributeMap.diff(a, b)).toEqual(expected);

    const c = 'string';
    expect(() => AttributeMap.diff(a, c)).toThrowError();
  });
});