import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain end optimization with exact conditions', () => {
  it('should expose array bounds mutation in optimization path', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(1).delete(1);
    const result = a.compose(b);
    // The mutation changes delta.ops.length - 1 to +1
    // This creates an observable difference when the optimization triggers
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].insert).toBe('AC');
  });
});