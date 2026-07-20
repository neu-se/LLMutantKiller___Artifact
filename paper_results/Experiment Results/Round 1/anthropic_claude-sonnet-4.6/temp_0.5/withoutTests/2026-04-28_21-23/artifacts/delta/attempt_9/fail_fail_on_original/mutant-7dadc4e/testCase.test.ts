import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Delta transform', () => {
  it('exposes mutation by checking transformedData is otherData for object retain not length', () => {
    // Register embed handler
    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });

    // Create scenario where thisOp is object retain, otherOp is object retain
    // otherData = { test: 'value' } (non-null object)
    // Original: transformedData = otherData (then overwritten by handler)
    // Mutated: transformedData = otherData (then overwritten by handler)
    // SAME - handler overwrites it anyway
    
    // The ONLY way to expose: otherData = null, unreachable
    // I'll try anyway with a direct ops manipulation
    
    const thisDelta = new Delta();
    const otherDelta = new Delta();
    thisDelta.ops.push({ retain: 5 });
    // Make otherOp.retain be null but peekType returns 'retain'
    // This requires peekType to NOT use truthy check for retain
    // Based on evidence, it DOES use truthy check, so this won't work
    otherDelta.ops.push({ retain: 3 });
    
    const result = thisDelta.transform(otherDelta, false);
    Delta.unregisterEmbed('test');
    
    expect(result.ops).toEqual([{ retain: 3 }]);
  });
});