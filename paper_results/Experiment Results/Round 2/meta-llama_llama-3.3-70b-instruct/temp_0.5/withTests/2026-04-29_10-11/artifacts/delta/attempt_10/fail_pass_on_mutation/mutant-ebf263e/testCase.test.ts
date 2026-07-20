import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle firstOther.retain correctly when firstOther is not null and firstOther.retain is a number and firstOther.attributes is null', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(5);
    const c = new Delta().insert('World');
    const composed = a.compose(b).compose(c);
    expect(composed.ops.length).toBe(1);
    expect(composed.ops[0].insert).toContain('Hello');
    expect(composed.ops[0].insert).toContain('World');
  });
});