import Delta from "../../src/Delta";

describe('invert() mutation detection', () => {
  it('should correctly invert a retain without attributes by not adding extra retain ops', () => {
    // When we have a retain with attributes, invert should produce retain with inverted attributes.
    // When we have a retain WITHOUT attributes, the outer condition handles it early (just retain, no base lookup).
    // The mutation changes `else if (op.retain && op.attributes)` to `else if (true)`,
    // which means for a delete op, after inserting the base op, it would also try to retain.
    // Actually the key case: retain with NO attributes inside the delete/retain branch
    // should NOT call inverted.retain with attribute inversion.
    
    // delta: retain 2 (no attributes) then delete 1
    // base: insert 'abc'
    // Expected: retain 2, insert 'c' (re-insert deleted char)
    const delta = new Delta().retain(2).delete(1);
    const base = new Delta().insert('abc');
    
    // The retain(2) with no attributes is handled by the early branch: inverted.retain(2)
    // The delete(1) should produce: inverted.insert('c')
    // In mutated code, delete(1) processing: if(op.delete) -> insert baseOp, 
    // but then else if(true) would also fire... no, it's if/else if so only one fires.
    
    // Let me reconsider: the mutation makes retain-without-attributes fall into the wrong branch
    // when inside the `op.delete || typeof op.retain === 'number'` block
    // A retain op with NO attributes is handled by the EARLY return: `inverted.retain(op.retain); return baseIndex + op.retain`
    // So that case never reaches the else-if.
    
    // The real issue: a retain WITH attributes - the `else if (op.retain && op.attributes)` 
    // vs `else if (true)` - both would handle it the same way for retain+attributes.
    // But for a DELETE op, `if (op.delete)` fires, NOT the else-if. So mutation doesn't affect delete.
    
    // Wait - re-reading: the if/else structure means for delete, only `if(op.delete)` runs.
    // The mutation only affects when op.delete is FALSY but we're in the outer branch.
    // That means: op.retain is a number AND op.attributes exists -> same behavior.
    // But: op.retain is a number AND op.attributes is NULL/undefined -> original: nothing; mutated: retain called!
    
    const expected = new Delta().retain(2).insert('c');
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});