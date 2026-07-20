import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle firstOther.retain correctly when firstOther is not null and firstOther.retain is a number and firstOther.attributes is null', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(5);
    const c = new Delta().insert('A');
    const expected = new Delta().insert('A').insert('Hello');
    expect(a.compose(b).compose(c)).toEqual(expected);
  });
});