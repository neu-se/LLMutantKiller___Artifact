import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('when this deletes and other retains with attributes, result should not include the retain', () => {
    // this deletes position 0
    // other retains position 0 with bold attribute
    const thisDelta = new Delta().delete(1);
    const otherDelta = new Delta().retain(1, { bold: true });
    
    const result = thisDelta.transform(otherDelta, false);
    
    // The retain with attributes should be dropped since this deleted that content
    // Original: continue skips the else branch that would add retain
    // Mutated: if(thisOp.delete){} - else branch won't run either, same result?
    expect(result.ops).toEqual([]);
  });
});