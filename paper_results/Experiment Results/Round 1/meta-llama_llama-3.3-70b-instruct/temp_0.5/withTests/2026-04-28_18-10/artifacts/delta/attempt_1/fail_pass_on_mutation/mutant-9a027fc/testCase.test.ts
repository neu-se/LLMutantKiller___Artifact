import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform()', () => {
  it('should transform correctly when otherData is an object and not null', () => {
    const a = new Delta().retain(1, { color: 'blue' });
    const b = new Delta().retain(1, { bold: true, color: 'red' });
    const expected = new Delta().retain(1, { bold: true });
    expect(a.transform(b, true)).toEqual(expected);
  });

  it.skip('should transform correctly when otherData is not an object or is null', () => {
    const a = new Delta().retain(1, { color: 'blue' });
    const b = new Delta().retain(1, 2);
    const expected = new Delta().retain(1, 2);
    expect(a.transform(b, true)).toEqual(expected);
  });
});