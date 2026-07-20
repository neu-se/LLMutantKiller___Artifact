import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() optimization', () => {
  it('should optimize when rest of other is just retain with matching attributes', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .retain(2);
    const b = new Delta().retain(5, { bold: true });
    const result = a.compose(b);
    // The optimization should merge the retains
    expect(result.ops).toEqual([
      { insert: 'A', attributes: { bold: true } },
      { insert: 'B' },
      { insert: 'C', attributes: { bold: true } },
      { retain: 7, attributes: { bold: true } }
    ]);
  });
});