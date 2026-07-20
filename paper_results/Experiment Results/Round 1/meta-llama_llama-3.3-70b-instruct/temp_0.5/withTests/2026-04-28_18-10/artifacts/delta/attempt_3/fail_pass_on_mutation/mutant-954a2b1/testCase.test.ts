import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('should return the correct result when firstOther is not null and firstOther.retain is a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });

  it.skip('should throw an error when firstOther is not null and firstOther.retain is not a number and firstOther is an embed', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain({ embed: 1 });
    expect(() => a.compose(b)).toThrowError('embed types not matched');
  });
});