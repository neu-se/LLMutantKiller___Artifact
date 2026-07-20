import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should handle transform when thisOp retains an embed and otherOp retains null', () => {
    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => ({ transformed: true }),
    });

    try {
      // Construct ops directly to get retain: null
      const thisDelta = new Delta([{ retain: { image: 'a' } }, { insert: 'x' }]);
      const otherDelta = new Delta([{ retain: null as any }, { insert: 'y' }]);

      // Original: typeof null === 'object' but null !== null is false, so condition is false, skip block
      // Mutated: (thisData is non-null object) || (...) = true, enters block
      // Object.keys(null) throws TypeError in Node.js
      expect(() => thisDelta.transform(otherDelta, false)).not.toThrow();
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});