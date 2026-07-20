import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle firstOther.retain correctly when firstOther is not null and firstOther.retain is a number and firstOther.attributes is null', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    b.ops[0].attributes = null;
    const c = new Delta().insert('B');
    const expected = new Delta().insert('A').insert('B');
    expect(a.compose(b).compose(c)).not.toEqual(new Delta().insert('B').insert('A'));
  });
});