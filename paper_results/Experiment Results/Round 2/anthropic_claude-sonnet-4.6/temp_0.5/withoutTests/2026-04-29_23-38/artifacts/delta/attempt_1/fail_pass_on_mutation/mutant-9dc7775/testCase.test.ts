import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embed types', () => {
  it('should not crash when thisData is null during transform', () => {
    // Register a handler that we can use
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });

    // Create a delta where thisOp.retain could be null
    // thisOp.retain = null happens when retain: null is in ops
    const thisOps = new Delta([{ retain: null as any }]);
    const otherOps = new Delta([{ retain: { image: { src: 'b.png' } } }]);

    // Original: skips embed handler (thisData !== null is false)
    // Mutated: tries Object.keys(null) which throws
    expect(() => thisOps.transform(otherOps)).not.toThrow();
    
    Delta.unregisterEmbed('image');
  });
});