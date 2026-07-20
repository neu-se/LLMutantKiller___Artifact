import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle missing b object', () => {
    const a = { bold: true, color: 'red' };
    const b = undefined;
    const expected = { bold: null, color: null };
    expect(AttributeMap.diff(a, b)).toEqual(expected);
  });
});