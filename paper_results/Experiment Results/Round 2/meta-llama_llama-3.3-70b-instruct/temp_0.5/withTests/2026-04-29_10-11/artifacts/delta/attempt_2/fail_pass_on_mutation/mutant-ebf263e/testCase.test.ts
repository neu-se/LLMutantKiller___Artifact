import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle firstOther.retain correctly', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });

  it('should handle firstOther.retain with attributes correctly when firstOther is not null and firstOther.retain is a number and firstOther.attributes is null', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    b.ops[0].attributes = null;
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });
});