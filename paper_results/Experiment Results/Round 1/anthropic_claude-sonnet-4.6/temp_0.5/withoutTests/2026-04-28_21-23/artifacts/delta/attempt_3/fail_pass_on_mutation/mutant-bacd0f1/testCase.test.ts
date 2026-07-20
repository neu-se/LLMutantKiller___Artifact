import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should produce correct transformedData when otherData is an object retain', () => {
    Delta.registerEmbed('embed', {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (a: unknown, _b: unknown, _priority: boolean) => a,
    });

    // thisOp: insert (so thisData = undefined)
    // otherOp: object retain
    // transformedData should be otherData (the object)
    // Original: typeof obj === 'object' && obj !== null = true -> otherData ✓
    // Mutated:  typeof obj === 'object' || obj !== null = true -> otherData ✓
    // Same... but then embed handler block: typeof thisData === 'object' is false, skip
    // So transformedData = otherData in both cases
    
    const a = new Delta().insert('x');
    const b = new Delta().retain({ embed: { val: 1 } });

    const result = a.transform(b, false);
    // a inserts 'x' (length 1), b retains embed (length 1)
    // With priority=false: delta.retain(1) for the insert, then process remaining
    // Then otherIter still has retain({embed:{val:1}})
    // thisIter empty -> thisOp = {retain: Infinity}
    // otherOp = {retain: {embed:{val:1}}}
    // transformedData = {embed:{val:1}} (object)
    // embed handler: typeof Infinity === 'object' is false -> skip
    // delta.retain({embed:{val:1}}, AttributeMap.transform(undefined, undefined, false))
    // = delta.retain({embed:{val:1}})
    expect(result.ops).toEqual([
      { retain: 1 },
      { retain: { embed: { val: 1 } } }
    ]);

    Delta.unregisterEmbed('embed');
  });
});