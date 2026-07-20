import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('transform: when this deletes and other retains with attributes, result should be empty', () => {
    // this: delete(1)
    // other: retain(1, {bold: true})
    // The retain should be dropped since this deleted the content
    const thisDelta = new Delta().delete(1);
    const otherDelta = new Delta().retain(1, { bold: true });
    const result = thisDelta.transform(otherDelta, false);
    // Original: thisOp.delete → continue → retain not added
    // Mutated: thisOp.delete → empty → else not taken → retain not added
    // Both should be [] ... 
    expect(result.ops).toEqual([]);
  });
});