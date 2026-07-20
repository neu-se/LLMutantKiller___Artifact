import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should correctly transform when thisOp retain length is less than otherOp retain length', () => {
    // this delta retains 2 characters
    // other delta retains 5 characters
    // When transforming, length = min(2, 5) = 2
    // Original: transformedData = (typeof 5 === 'object' && ...) ? 5 : 2 → 2
    // Mutated:  transformedData = (true && 5 !== null) ? 5 : 2 → 5
    const thisDelta = new Delta().retain(2);
    const otherDelta = new Delta().retain(5);
    
    const result = thisDelta.transform(otherDelta, false);
    
    // Expected: retain(2) then retain(3) → after chop, retain(5)
    // Original produces retain(2) + retain(3) = retain(5)
    // Mutated produces retain(5) + retain(3) = retain(8) — wrong!
    // Actually let me think more carefully...
    // After transform loop: first iteration length=2, transformedData=2 (original) or 5 (mutated)
    // Then second iteration: thisIter exhausted, otherIter has retain(3) left → push retain(3)
    // Original total: retain(2) + retain(3) = retain(5)
    // Mutated total: retain(5) + retain(3) = retain(8)
    
    expect(result).toEqual(new Delta().retain(5));
  });
});