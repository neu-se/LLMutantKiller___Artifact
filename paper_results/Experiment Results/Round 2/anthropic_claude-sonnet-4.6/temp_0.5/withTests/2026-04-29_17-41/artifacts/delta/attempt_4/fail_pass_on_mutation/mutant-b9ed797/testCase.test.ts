import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('push retain after insert with no attributes adds second op', () => {
    const delta = new Delta().insert('a');
    // lastOp = {insert: 'a'}, typeof lastOp === 'object' is true
    // newOp = {retain: 1}
    // isEqual(undefined, undefined) is TRUE (both have no attributes)
    // typeof newOp.insert === 'string' is FALSE (newOp is retain, not insert)
    // typeof newOp.retain === 'number' && typeof lastOp.retain === 'number' is FALSE (lastOp is insert)
    // Falls through to PLACEHOLDER
    // Original: } closes if(isEqual), then if(index===ops.length) -> push -> 2 ops
    // Mutated: if(false){ wraps push -> op dropped -> 1 op
    delta.push({ retain: 1 });
    expect(delta.ops.length).toEqual(2);
    expect(delta.ops[1]).toEqual({ retain: 1 });
  });
});