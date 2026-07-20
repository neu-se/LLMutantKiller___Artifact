import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('insert before delete with no previous op uses unshift correctly', () => {
    // Start with just a delete op
    const delta = new Delta();
    delta.push({ delete: 2 });
    // Now push an insert - triggers reorder logic:
    // index = 1, lastOp = {delete:2}
    // lastOp.delete && newOp.insert -> index becomes 0
    // lastOp = this.ops[-1] = undefined -> not an object
    // -> calls this.ops.unshift(newOp) and returns
    delta.push({ insert: 'hi' });
    expect(delta.ops).toEqual([{ insert: 'hi' }, { delete: 2 }]);
    expect(delta.ops.length).toEqual(2);
  });
});