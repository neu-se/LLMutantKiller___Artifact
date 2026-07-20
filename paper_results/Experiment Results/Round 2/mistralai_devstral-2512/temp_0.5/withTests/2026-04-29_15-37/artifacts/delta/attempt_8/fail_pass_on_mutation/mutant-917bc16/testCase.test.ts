import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() optimization', () => {
  it('should apply retain end optimization when composing with delete at end', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .insert('E', { bold: true })
      .insert('F');
    const b = new Delta().retain(1).delete(1);
    const result = a.compose(b);
    // The optimization should merge adjacent retains
    expect(result.ops.length).toBe(4);
    expect(result.ops[0]).toEqual({ insert: 'AC', attributes: { bold: true } });
    expect(result.ops[1]).toEqual({ insert: 'D' });
    expect(result.ops[2]).toEqual({ insert: 'E', attributes: { bold: true } });
    expect(result.ops[3]).toEqual({ insert: 'F' });
  });
});