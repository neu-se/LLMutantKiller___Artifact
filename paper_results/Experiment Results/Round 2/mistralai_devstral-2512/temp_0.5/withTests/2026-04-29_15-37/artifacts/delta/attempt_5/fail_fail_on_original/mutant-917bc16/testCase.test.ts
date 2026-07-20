import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() optimization', () => {
  it('should optimize when rest of other is just retain after delete', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .retain(5)
      .delete(1);
    const b = new Delta().retain(4).insert('D');
    const result = a.compose(b);
    // The optimization should merge the retain operations
    expect(result.ops).toHaveLength(6);
    expect(result.ops[3]).toEqual({ retain: 1 });
    expect(result.ops[4]).toEqual({ insert: 'D' });
    expect(result.ops[5]).toEqual({ retain: 4 });
  });
});