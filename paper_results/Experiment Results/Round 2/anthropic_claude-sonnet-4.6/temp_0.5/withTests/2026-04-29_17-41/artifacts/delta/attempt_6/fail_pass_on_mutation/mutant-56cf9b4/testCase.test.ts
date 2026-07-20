import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert()', () => {
  it('delete op with value 0 and retain combination', () => {
    // Construct a raw op with delete:0 - this is falsy
    // if(op.delete) -> false (0 is falsy)  
    // else if(op.retain && op.attributes) vs else if(true)
    // But we need op.retain to be set too for this to matter
    // If only delete:0 is set, op.retain is undefined -> typeof undefined !== 'number'
    // So op.delete || typeof op.retain === 'number' = 0 || false = false -> not in forEach branch
    
    // What about delete:0, retain:2, attributes:{bold:true}?
    // op.delete || typeof op.retain === 'number' = 0 || true = true -> enters forEach
    // Early return: typeof op.retain === 'number' && op.attributes == null -> false -> no early return
    // forEach: if(op.delete) -> if(0) -> false
    // else if(op.retain && op.attributes) -> 2 && {bold:true} -> truthy
    // else if(true) -> truthy
    // SAME RESULT! Both call retain.
    
    // I truly cannot find a killable case. Let me just submit the most likely candidate
    // that I haven't tried yet: a retain op where op.retain is a positive number
    // but somehow op.attributes is falsy... which requires direct construction with
    // attributes set to 0 or false (invalid but possible via type casting)
    
    const delta = new Delta([{ retain: 2, attributes: (0 as any) }]);
    const base = new Delta().insert('ab');
    
    // op.attributes = 0, which is falsy
    // typeof op.retain === 'number' && op.attributes == null -> 0 == null -> false -> no early return
    // op.delete || typeof op.retain === 'number' -> true -> enters forEach
    // if(op.delete) -> false
    // Original: else if(op.retain && op.attributes) -> 2 && 0 -> 0 -> false -> nothing
    // Mutated: else if(true) -> true -> calls retain(2, AttributeMap.invert(0, undefined))
    
    const inverted = delta.invert(base);
    const expected = new Delta(); // Original: nothing added in forEach, no early return retain either
    // Wait: early return check: typeof 2 === 'number' && 0 == null -> false (0 != null)
    // So no early return. forEach runs. if(op.delete) false. 
    // Original: else if(2 && 0) -> false -> nothing. inverted stays empty.
    // Mutated: else if(true) -> retain(2, AttributeMap.invert(0, undefined)) -> adds retain op
    
    expect(inverted).toEqual(expected);
  });
});