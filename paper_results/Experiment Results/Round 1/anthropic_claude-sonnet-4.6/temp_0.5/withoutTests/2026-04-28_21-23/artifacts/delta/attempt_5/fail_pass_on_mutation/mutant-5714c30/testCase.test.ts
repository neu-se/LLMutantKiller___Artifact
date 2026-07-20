import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('does not throw when thisOp retain is an object and otherOp retain is null', () => {
    Delta.registerEmbed('video', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({ transformed: true }),
    });

    try {
      // thisData = { video: {...} } (non-null object), otherData = null
      // Original: true && true && typeof null === 'object' (true) && null !== null (false) => false, no handler
      // Mutated: typeof {video:...} === 'object' (true) || ... => true, enters block
      //          Object.keys({video:...}) = ['video'], embedType = 'video'
      //          Object.keys(null) throws TypeError!
      const thisDelta = new Delta([{ retain: { video: { src: 'test' } } }]);
      const otherDelta = new Delta([{ retain: null as any }]);
      expect(() => thisDelta.transform(otherDelta, false)).not.toThrow();
    } finally {
      Delta.unregisterEmbed('video');
    }
  });
});