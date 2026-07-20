import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('retain start optimization with insert and delete', () => {
    const a = new Delta().insert('A', { bold: true });
    const b = new Delta().retain(1).insert('B');
    const result = a.compose(b);
    expect(result.ops[0].insert).toBe('A');
    expect(result.ops[0].attributes).toEqual({ bold: true });
  });
});