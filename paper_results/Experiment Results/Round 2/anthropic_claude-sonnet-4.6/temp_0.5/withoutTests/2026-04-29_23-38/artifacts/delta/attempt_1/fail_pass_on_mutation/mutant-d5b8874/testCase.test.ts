import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose with null retain', () => {
  it('should not push delete when thisOp retain is null', () => {
    // Create a delta where compose encounters thisOp.retain === null
    // This happens when we have an op with retain: null
    // We need to craft ops such that thisOp has retain=null and otherOp has delete
    const base = new Delta([{ retain: null as any }]);
    const other = new Delta([{ delete: 1 }]);
    const result = base.compose(other);
    // With original: typeof null === 'object' && null !== null => false, delete NOT pushed
    // With mutation: typeof null === 'object' && true => true, delete IS pushed
    expect(result.ops).toEqual([]);
  });
});