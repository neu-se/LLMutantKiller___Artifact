import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('push op when last op is delete and no prior op', () => {
    // ops: [{delete:1}], push({retain:1})
    // lastOp = {delete:1}, typeof lastOp === 'object' -> true
    // delete+delete? newOp is retain, not delete -> false
    // lastOp.delete is number AND newOp.insert? newOp.insert is null -> false
    // isEqual(undefined, undefined) -> true
    // string merge? newOp.retain, not insert -> false
    // retain merge? newOp.retain=1 is number, lastOp.retain is undefined -> false
    // PLACEHOLDER reached
    const delta = new Delta().delete(1);
    delta.push({ retain: 1 });
    expect(delta.ops.length).toEqual(2);
    expect(delta.ops[0]).toEqual({ delete: 1 });
    expect(delta.ops[1]).toEqual({ retain: 1 });
  });
});