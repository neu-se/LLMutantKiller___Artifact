import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('compose where insert reordering causes index to be less than ops length requiring splice not push', () => {
    // Need a compose result where an op must be spliced into middle
    // In compose, delta.push is called. If index was decremented (insert before delete),
    // and the prior op doesn't merge, splice(index) is needed.
    // Original uses splice correctly. Mutant also uses splice. Same result.
    // 
    // BUT: what if index === ops.length AND we need push not splice?
    // splice(ops.length, 0, x) === push(x) always.
    //
    // The mutation CANNOT be detected through normal push behavior.
    // Let me check if there's a case in the retain() method that's affected:
    // retain() calls push(). The retain method has:
    //   if (attributes != null && true && Object.keys(attributes).length > 0)
    // The "true" there is suspicious - that's another mutation perhaps.
    // 
    // Let me focus: splice vs push - is there ANY observable difference?
    // splice returns array of removed elements, push returns new length.
    // But push() method returns `this`, not the splice/push result.
    // So return value doesn't matter.
    //
    // The only difference: if somehow ops.length changes between setting index
    // and calling splice. Could another op be added? No.
    //
    // I think the mutation might be a no-op for most cases.
    // Let me try the one edge case: index=0, ops=[] 
    // splice(0,0,x) on [] gives [x]. push(x) on [] gives [x]. Same.
    
    // Try using transform which exercises push in complex ways
    const a = new Delta().retain(2).insert('si').delete(5);
    const b = new Delta().retain(1).insert('e').delete(5).retain(1).insert('ow');
    const result = a.transform(b, false);
    const expected = new Delta().retain(1).insert('e').delete(1).retain(2).insert('ow');
    expect(result).toEqual(expected);
  });
});