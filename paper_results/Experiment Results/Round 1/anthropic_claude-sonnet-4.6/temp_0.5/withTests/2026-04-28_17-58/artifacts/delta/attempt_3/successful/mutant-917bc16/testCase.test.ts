import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain end optimization: concat does not merge ops after the first in rest', () => {
    const a = new Delta([
      { insert: 'A', attributes: { bold: true } },
      { insert: 'B' },
      { insert: 'C' },
      { insert: 'D' },
    ]);
    const b = new Delta().retain(1).insert('X', { bold: true });
    
    const result = a.compose(b);
    
    // Original: optimization fires after processing 'B' (otherIter exhausted, last op matches)
    // rest = [{insert:'C'}, {insert:'D'}]
    // concat: push 'C' (merges with 'B' -> 'BC'), then directly append 'D' (no push)
    // Result: [{insert:'AX', bold:true}, {insert:'BC'}, {insert:'D'}]
    //
    // Mutant: no optimization, 'C' and 'D' go through loop
    // 'C' merges with 'B' -> 'BC', 'D' merges with 'BC' -> 'BCD'
    // Result: [{insert:'AX', bold:true}, {insert:'BCD'}]
    
    expect(result.ops).toEqual([
      { insert: 'AX', attributes: { bold: true } },
      { insert: 'BC' },
      { insert: 'D' },
    ]);
  });
});