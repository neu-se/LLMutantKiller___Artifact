import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should handle null thisData retain correctly without entering embed handler block', () => {
    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, _b: unknown) => a,
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
    });

    try {
      // Create a delta where thisOp.retain is null (object but null)
      // This requires pushing a raw op with retain: null
      const thisDelta = new Delta([{ retain: null as any }]);
      const otherDelta = new Delta().retain({ image: { src: 'b.png' } });

      // In original: typeof null === 'object' but null !== null is false (thisData !== null fails)
      // so embed block is skipped, transformedData = otherData = {image: {src: 'b.png'}}
      // In mutated: true && replaces thisData !== null, so block IS entered
      // Object.keys(null) throws TypeError!
      expect(() => {
        thisDelta.transform(otherDelta, false);
      }).not.toThrow();
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});