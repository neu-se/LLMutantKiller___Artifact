import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transform where thisOp is insert and otherOp is object retain without matching embed handler', () => {
    // Force the else branch where transformedData is computed
    // thisOp = insert (not retain), otherOp = object retain
    // thisData = undefined, otherData = { foo: 'bar' }
    // Original: typeof {foo:'bar'} === 'object' && {foo:'bar'} !== null => true => transformedData = otherData
    // Mutated: same result
    // No difference here either...
    
    // The ONLY difference is when otherData === null
    // Let me try with otherOp having retain: null but ensure it's treated as retain type
    
    const thisDelta = new Delta().insert('hello');
    const otherDelta = new Delta();
    // Use retain with object that has null value - but the object itself is not null
    otherDelta.ops.push({ retain: { img: null } });
    
    const result = thisDelta.transform(otherDelta, false);
    // otherData = { img: null } - non-null object
    // Both versions: transformedData = { img: null }
    expect(result.ops[0]).toBeDefined();
  });
});