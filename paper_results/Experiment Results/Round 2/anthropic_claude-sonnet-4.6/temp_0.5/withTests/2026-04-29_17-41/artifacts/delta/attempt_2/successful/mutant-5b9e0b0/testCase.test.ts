import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with embed retain + embed retain', () => {
  it('correctly composes two embed retain operations producing a retain op (not an empty-key op)', () => {
    Delta.registerEmbed('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as { insert: string }[]).compose(new Delta(b as { insert: string }[])).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as { insert: string }[]).transform(new Delta(b as { insert: string }[]), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as { insert: string }[]).invert(new Delta(b as { insert: string }[])).ops,
    });

    try {
      // thisOp.retain is an object (not null), so action should be 'retain'
      // With mutation, action becomes '' which means newOp[''] is set instead of newOp['retain']
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      const result = a.compose(b);

      // The result should have a retain op with the composed embed
      // With original: newOp.retain = { delta: [...composed...] }
      // With mutation: newOp[''] = { delta: [...] }, newOp.retain is undefined -> result differs
      expect(result.ops.length).toBeGreaterThan(0);
      const firstOp = result.ops[0];
      // The first op must be a retain (not have an empty string key as the embed holder)
      expect(firstOp.retain).toBeDefined();
      expect(typeof firstOp.retain).toBe('object');
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});