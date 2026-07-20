import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("transform()", () => {
  it("delete this with retain other having object embed should produce empty not call retain", () => {
    // Case: thisOp is delete, otherOp is retain (number)
    // In original: continue skips everything
    // In mutated: if(thisOp.delete){} skips else-if and else -> same as continue
    // These are equivalent so let me try where otherOp.retain is an object
    // which would go to else branch and call delta.retain with object
    
    // Actually let me check: in the else branch:
    // typeof otherData === 'object' && otherData !== null ? otherData : length
    // If otherOp is {retain: {embed: 1}}, transformedData = {embed: 1}
    // delta.retain({embed:1}, ...) would be called in mutated but not original
    
    const a = new Delta().delete(1);
    const b = new Delta().retain({ embed: 1 });
    // Original: continue -> empty delta after chop
    // Mutated: else branch -> delta.retain({embed:1}) -> not chopped (object retain)
    const expected = new Delta();
    expect(a.transform(b, true)).toEqual(expected);
  });
});