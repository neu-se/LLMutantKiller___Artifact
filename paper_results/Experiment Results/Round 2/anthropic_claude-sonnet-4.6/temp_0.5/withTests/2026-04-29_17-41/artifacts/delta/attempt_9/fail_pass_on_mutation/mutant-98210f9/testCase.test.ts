import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() mutation in retain embed branch', () => {
  it('retain embed composed with retain embed - verify op count and type', () => {
    Delta.registerEmbed('box', {
      compose: (_a: unknown, _b: unknown, _keepNull: boolean) => ({ v: 99 }),
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({ v: 99 }),
      invert: (_a: unknown, _b: unknown) => ({ v: 99 }),
    });

    try {
      const a = new Delta().retain({ box: { v: 1 } });
      const b = new Delta().retain({ box: { v: 2 } });

      const result = a.compose(b);

      // Log what we actually get to understand the behavior
      // Original: action='retain' -> newOp = {retain:{box:{v:99}}}
      // chop() only removes trailing numeric retains without attributes, not embed retains
      // So result should have 1 op with retain
      // Mutated: action='insert' -> newOp = {insert:{box:{v:99}}}
      // chop() doesn't remove inserts
      // So result should have 1 op with insert

      // The key difference: retain embed vs insert embed
      const op = result.ops[0];
      expect('retain' in op).toBe(true);
      expect('insert' in op).toBe(false);
    } finally {
      Delta.unregisterEmbed('box');
    }
  });
});