import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should not retain when this delta deletes and other delta retains at the same position', () => {
    // this delta deletes 1 character
    const thisDelta = new Delta().delete(1);
    // other delta retains 1 character
    const otherDelta = new Delta().retain(1);
    
    // When this has a delete and other has a retain at the same position,
    // the retain should be dropped (our delete removes their retain)
    const result = thisDelta.transform(otherDelta, false);
    
    // Original: continue skips the retain, result should be empty
    // Mutated: falls through to else branch, adds retain(1), result has retain(1)
    expect(result.ops).toEqual([]);
  });
});