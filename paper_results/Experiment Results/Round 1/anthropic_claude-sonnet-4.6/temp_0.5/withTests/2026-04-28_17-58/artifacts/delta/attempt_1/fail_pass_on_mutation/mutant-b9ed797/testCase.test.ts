import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push() with insert after delete reordering', () => {
  it('inserts text before a delete when there is a preceding insert', () => {
    // This tests the case where index is decremented due to insert-before-delete reordering
    // and the new op needs to be spliced into the middle of the ops array
    // Original: uses splice when index < ops.length, push when index === ops.length
    // Mutated: always uses splice (if false means push branch never taken)
    // For a simple append, splice(length, 0, op) === push(op), so no difference
    // But we need a case where the closing brace of the outer if matters
    
    // Build: insert('a').delete(1).insert('b')
    // After insert('a'): ops = [{insert:'a'}]
    // After delete(1): ops = [{insert:'a'}, {delete:1}]
    // After insert('b'): should reorder to insert('ab').delete(1)
    const delta = new Delta().insert('a').delete(1).insert('b');
    const expected = new Delta().insert('ab').delete(1);
    expect(delta).toEqual(expected);
    expect(delta.ops).toEqual([{ insert: 'ab' }, { delete: 1 }]);
  });
});