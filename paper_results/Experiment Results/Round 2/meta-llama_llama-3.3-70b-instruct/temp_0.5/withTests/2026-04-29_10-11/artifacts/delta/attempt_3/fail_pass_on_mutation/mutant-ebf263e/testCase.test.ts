import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle firstOther.retain correctly when firstOther is not null and firstOther.retain is a number and firstOther.attributes is null', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    b.ops[0].attributes = null;
    const firstOp = b.ops[0];
    const expected = new Delta().insert('A');
    // Make firstOther.retain a number and firstOther.attributes null
    expect(a.compose(b)).toEqual(expected);
    // Check that the first op of b is processed correctly
    expect(b.ops[0]).toEqual(firstOp);
  });
});