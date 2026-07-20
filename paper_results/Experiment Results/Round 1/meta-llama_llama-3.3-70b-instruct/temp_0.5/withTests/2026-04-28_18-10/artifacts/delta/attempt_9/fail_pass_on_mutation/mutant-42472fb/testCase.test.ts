import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('retain start optimization with insert and delete', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(3).insert('X');
    const result = a.compose(b);
    expect(result.ops[0].insert).toBe('HelXlo');
    expect(result.ops.length).toBe(1);
  });
});