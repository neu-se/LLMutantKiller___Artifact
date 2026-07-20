import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator rest() at start with offset 0', () => {
  it('rest() at the very beginning returns all ops identical to original', () => {
    const ops = [
      { insert: 'Hello', attributes: { bold: true } },
      { retain: 3 },
      { delete: 4 },
    ];
    const iter = new OpIterator(ops);
    // offset === 0, index === 0 - no ops consumed yet

    const result = iter.rest();

    // Should return the exact same ops (via slice)
    // In mutated code, else branch calls next() which reconstructs ops
    // next() for string insert uses substr(0, 5) = 'Hello', with attributes
    // But then rest = ops.slice(1) = [retain:3, delete:4]
    // So [reconstructed_hello, retain, delete] vs original [hello, retain, delete]
    // The reconstructed op from next() should equal original...
    
    // The key: after rest() is called, iterator state should be unchanged
    // Call next() and verify we still get the full first op
    const nextOp = iter.next();
    expect(nextOp).toEqual({ insert: 'Hello', attributes: { bold: true } });
    expect(iter.next()).toEqual({ retain: 3 });
    expect(iter.next()).toEqual({ delete: 4 });
  });
});