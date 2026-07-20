import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('retain start optimization with insert and delete', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .delete(1);
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .delete(1);
    expect(a.compose(b).ops[0].insert).toBe('A');
    expect(a.compose(b).ops[1].insert).toBe('B');
    expect(a.compose(b).ops[2].insert).toBe('C');
    expect(a.compose(b).ops[3].insert).toBe('D');
    expect(a.compose(b).ops[4].delete).toBe(1);
  });
});