import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle firstOther.retain correctly when firstOther is not null and firstOther.retain is a number and firstOther.attributes is null', () => {
    const a = new Delta().retain(5);
    const b = new Delta().insert('Hello');
    const c = new Delta().retain(1);
    const expected = new Delta().insert('Hello');
    expect(a.compose(b).compose(c)).toEqual(expected);
  });
});