import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push() correctly appends non-mergeable ops', () => {
  it('appends a retain after an insert with mismatched attributes', () => {
    // insert('a', {bold:true}) then retain(1) - different attributes, no merge
    // lastOp IS an object, no merge conditions met
    // Original: falls through to if(index===ops.length) -> push -> 2 ops
    // Mutated: inside if(false) block -> op is DROPPED -> 1 op
    const delta = new Delta().insert('a', { bold: true }).retain(1);
    expect(delta.ops.length).toEqual(2);
    expect(delta.ops[0]).toEqual({ insert: 'a', attributes: { bold: true } });
    expect(delta.ops[1]).toEqual({ retain: 1 });
  });
});