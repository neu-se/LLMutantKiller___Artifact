import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta push', () => {
  it('should correctly handle pushing ops when insert precedes a delete', () => {
    // Build: [insert('a'), delete(2)] then push insert('b') with bold attribute
    // index=2, lastOp=delete -> index becomes 1, lastOp=insert('a')
    // attributes differ (null vs {bold:true}), so no merge
    // index(1) !== ops.length(2), so splice(1, 0, newOp)
    // Result: [insert('a'), insert('b',bold), delete(2)]
    const delta = new Delta([
      { insert: 'a' },
      { delete: 2 }
    ]);
    delta.insert('b', { bold: true });
    expect(delta.ops).toEqual([
      { insert: 'a' },
      { insert: 'b', attributes: { bold: true } },
      { delete: 2 }
    ]);
  });
});