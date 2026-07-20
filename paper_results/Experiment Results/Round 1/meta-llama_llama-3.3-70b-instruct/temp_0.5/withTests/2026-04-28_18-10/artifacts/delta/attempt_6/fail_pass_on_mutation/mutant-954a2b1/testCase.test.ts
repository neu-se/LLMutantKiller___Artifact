import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('should return the correct result when firstOther is not null and firstOther.retain is a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });

  it('should not throw an error when firstOther is not null and firstOther.retain is a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    expect(() => a.compose(b)).not.toThrowError();
  });
});