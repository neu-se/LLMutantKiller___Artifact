import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should correctly transform retain ops producing length-based retain when otherData is a number', () => {
    // The mutation: typeof otherData === 'object' && otherData !== null
    // becomes:      typeof otherData === 'object' && true
    // When otherData is a number (e.g., 3), typeof 3 === 'object' is false in both cases
    // so transformedData = length in both. No difference for numbers.
    //
    // When otherData is null: original => false (null !== null), mutated => true
    // But null retain is falsy so the if(otherOp.retain) branch won't execute.
    //
    // The real difference: with the mutation, typeof otherData === 'object' && true
    // means ANY object otherData (including null) triggers otherData path.
    // For null: original uses length, mutated uses null.
    // We need otherOp.retain to be truthy but also be null... impossible.
    //
    // Wait - re-read: the condition is the FULL ternary condition.
    // transformedData = (typeof otherData === 'object' && otherData !== null) ? otherData : length
    // For number otherData: false ? otherData : length => length (same in both)
    // For object otherData (embed): true ? otherData : length => otherData (same in both)  
    // For null otherData: original false=>length, mutated true=>null
    // But null retain is falsy, so if(otherOp.retain) is false, branch not taken.
    //
    // So the mutation has NO observable effect? Let me look again at the if condition...
    // "if (otherOp.retain)" - this is truthy check. null is falsy. So yes, no effect.
    // Unless... the mutation affects something else I'm missing.
    //
    // Actually wait - what if otherData is a number and we look at the ternary again?
    // Original: typeof number === 'object' => false => uses length ✓
    // Mutated: typeof number === 'object' => false => uses length ✓  same
    //
    // Hmm, but what about when thisOp is a retain number and otherOp is a retain number?
    // otherData = length (a number), thisData = length (a number)
    // The embed handler block only runs if both are objects.
    // transformedData starts as: condition ? otherData : length
    // If otherData is a number: both give length. Same result.
    //
    // I think the mutation might be a no-op in practice, but let me try to find
    // a case where it matters by testing with retain(0) or edge cases.
    
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(3).insert('X');
    const result = a.transform(b, true);
    expect(result.ops).toEqual([{ retain: 5 }, { insert: 'X' }]);
  });
});