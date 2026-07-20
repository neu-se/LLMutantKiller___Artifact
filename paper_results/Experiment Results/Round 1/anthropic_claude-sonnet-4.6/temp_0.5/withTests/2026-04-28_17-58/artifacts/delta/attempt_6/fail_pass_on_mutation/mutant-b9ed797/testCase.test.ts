import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('consecutive retains with mismatched attributes both get added', () => {
    const delta = new Delta();
    delta.push({ retain: 1, attributes: { bold: true } });
    delta.push({ retain: 1 });
    // lastOp IS an object, attributes DON'T match (no merge)
    // original: closes outer-if, then push -> 2 ops
    // mutant: if(false) never executes -> second op lost -> 1 op
    expect(delta.ops.length).toEqual(2);
    expect(delta.ops[0]).toEqual({ retain: 1, attributes: { bold: true } });
    expect(delta.ops[1]).toEqual({ retain: 1 });
  });
});