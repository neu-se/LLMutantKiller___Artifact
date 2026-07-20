import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle firstOther.retain correctly when firstOther is not null and firstOther.retain is a number and firstOther.attributes is null', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(5);
    b.ops[0].attributes = null;
    const c = new Delta().insert('World');
    const expected = new Delta().insert('Hello').insert('World');
    expect(a.compose(b).compose(c)).toEqual(expected);
  });
});