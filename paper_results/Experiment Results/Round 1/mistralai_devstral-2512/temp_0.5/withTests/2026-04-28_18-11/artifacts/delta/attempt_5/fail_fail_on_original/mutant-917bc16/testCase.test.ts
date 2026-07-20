import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() optimization', () => {
  it('should optimize when composing with retain that matches last operation', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(3, { bold: true });
    const result = a.compose(b);
    // The optimization should merge the retain with the last insert
    expect(result.ops).toHaveLength(2);
    expect(result.ops[1]).toEqual({ retain: 3, attributes: { bold: true } });
  });
});