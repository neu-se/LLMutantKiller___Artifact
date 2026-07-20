import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('throws or behaves differently when thisOp retain is null and otherOp retain is object', () => {
    Delta.registerEmbed('video', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({ transformed: true }),
    });

    try {
      // Construct delta with null retain directly
      const thisDelta = new Delta([{ retain: null as any }]);
      const otherDelta = new Delta().retain({ video: { src: 'test' } });
      
      // Original: typeof null === 'object' (true) && null !== null (false) => false, no embed handler
      // Mutated:  typeof null === 'object' (true) || ... => true, tries Object.keys(null) => throws!
      expect(() => thisDelta.transform(otherDelta, false)).not.toThrow();
    } finally {
      Delta.unregisterEmbed('video');
    }
  });
});