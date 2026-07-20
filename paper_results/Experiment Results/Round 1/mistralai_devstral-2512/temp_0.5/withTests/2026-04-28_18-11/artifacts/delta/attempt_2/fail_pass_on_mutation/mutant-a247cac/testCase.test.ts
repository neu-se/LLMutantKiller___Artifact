import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain end optimization', () => {
  it('should correctly optimize when composing with retain and delete', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(1).delete(1);
    const result = a.compose(b);
    const expectedOps = [
      { insert: 'AC', attributes: { bold: true } }
    ];
    expect(result.ops).toEqual(expectedOps);
  });
});