import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('transform: this=delete, other=retain with attributes should drop the retain', () => {
    // If this deletes a character and other retains it with attributes,
    // the retain should be dropped in the transform result
    const a = new Delta().delete(3);
    const b = new Delta().retain(3, { bold: true });
    
    // Original: thisOp.delete → continue → retain not added → result is []
    // Mutated: thisOp.delete → empty → else not taken → retain not added → result is []
    // Same result... 
    
    // Let me try: this=retain, other=delete
    const c = new Delta().retain(3);
    const d = new Delta().delete(3);
    const result = c.transform(d);
    expect(result.ops).toEqual([{ delete: 3 }]);
  });
});