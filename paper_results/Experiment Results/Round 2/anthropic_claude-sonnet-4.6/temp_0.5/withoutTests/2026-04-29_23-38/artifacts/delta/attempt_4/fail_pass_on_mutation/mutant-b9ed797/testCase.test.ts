import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta push', () => {
  it('should add a non-mergeable op after an existing op with different attributes', () => {
    const delta = new Delta();
    delta.insert('hello', { bold: true });
    // First insert goes in fine (no lastOp)
    // Second insert has different attributes, can't merge
    delta.insert('world');
    // With mutation: 'world' never gets added because lastOp IS an object
    // but attributes differ, so we fall through to if(false) which never executes
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[1]).toEqual({ insert: 'world' });
  });
});