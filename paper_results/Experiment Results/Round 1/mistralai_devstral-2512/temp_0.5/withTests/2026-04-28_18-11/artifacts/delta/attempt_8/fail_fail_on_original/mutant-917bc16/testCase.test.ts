import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() optimization', () => {
  it('should optimize when rest of other is just retain with matching attributes', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(3, { bold: true });
    const result = a.compose(b);
    // The optimization should merge the retain with the last insert
    expect(result.ops).toEqual([
      { insert: 'ABC', attributes: { bold: true } },
      { retain: 3, attributes: { bold: true } }
    ]);
  });
});