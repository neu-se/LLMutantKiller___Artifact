import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push() splice vs push behavior', () => {
  it('insert after delete reorders correctly when no previous op exists', () => {
    // When we do delete then insert, the insert should be moved before the delete
    // This exercises the path where index is decremented and unshift is used
    // But more importantly, test that a simple push appends correctly
    // The mutation changes push to always use splice - for normal appends
    // splice(length, 0, op) is equivalent to push, so we need the reorder case
    
    // insert(text) after delete: insert gets placed before delete
    // delta.delete(1).insert('a') should equal delta.insert('a').delete(1)
    const delta = new Delta().delete(1).insert('a');
    const expected = new Delta().insert('a').delete(1);
    expect(delta).toEqual(expected);
    
    // Now test the case where we have insert -> delete -> insert
    // The second insert should merge with the first insert (before the delete)
    const delta2 = new Delta().insert('a').delete(1).insert('b');
    const expected2 = new Delta().insert('ab').delete(1);
    expect(delta2).toEqual(expected2);
    
    // Verify ops structure directly
    expect(delta2.ops.length).toEqual(2);
    expect(delta2.ops[0]).toEqual({ insert: 'ab' });
    expect(delta2.ops[1]).toEqual({ delete: 1 });
  });
});