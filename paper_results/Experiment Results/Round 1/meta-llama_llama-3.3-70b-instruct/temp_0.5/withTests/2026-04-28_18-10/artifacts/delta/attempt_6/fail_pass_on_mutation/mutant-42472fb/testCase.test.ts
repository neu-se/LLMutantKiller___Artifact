import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('retain start optimization with insert and delete', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B', { italic: true })
      .insert('C', { bold: true })
      .delete(1);
    const b = new Delta().retain(3).insert('D');
    const result = a.compose(b);
    expect(result.ops.length).toBeGreaterThan(3);
  });
});