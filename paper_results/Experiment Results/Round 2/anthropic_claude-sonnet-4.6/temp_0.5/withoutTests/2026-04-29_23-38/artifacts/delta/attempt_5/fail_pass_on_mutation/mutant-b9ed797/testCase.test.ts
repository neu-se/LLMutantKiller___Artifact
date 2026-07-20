import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta push', () => {
  it('should correctly add op with different type after existing op', () => {
    // insert followed by retain - different types, won't merge
    // lastOp IS an object, so with mutation the retain never gets added
    const delta = new Delta([{ insert: 'hello' }]);
    delta.retain(5);
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[1]).toEqual({ retain: 5 });
  });
});