import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta push', () => {
  it('should handle embed insert after string insert', () => {
    const delta = new Delta();
    delta.insert('hello');
    delta.insert({ image: 'url' });
    // lastOp is {insert: 'hello'} (object), attributes equal (both undefined)
    // types differ (string vs object), no merge
    // index(1) === ops.length(1), original: push, mutated: splice(1,0,op)
    // Both should result in 2 ops
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[0]).toEqual({ insert: 'hello' });
    expect(delta.ops[1]).toEqual({ insert: { image: 'url' } });
  });
});