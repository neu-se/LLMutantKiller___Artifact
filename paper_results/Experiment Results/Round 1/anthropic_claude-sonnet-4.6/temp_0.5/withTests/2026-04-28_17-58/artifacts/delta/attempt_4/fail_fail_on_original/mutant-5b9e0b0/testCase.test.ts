import Delta from "../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain an embed with an embed uses retain action (not empty string)', () => {
    Delta.registerEmbed('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as { insert: string }[]).compose(new Delta(b as { insert: string }[])).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as { insert: string }[]).transform(new Delta(b as { insert: string }[]), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as { insert: string }[]).invert(new Delta(b as { insert: string }[])).ops,
    });

    try {
      // When thisOp.retain is an object (not null), original code sets action='retain'
      // Mutated code sets action='' causing newOp[''] to be set instead of newOp.retain
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      const result = a.compose(b);

      // With original: result has a retain op with composed embed data
      // With mutation: result has an op with key '' instead of 'retain', so retain is undefined
      expect(result.ops.length).toEqual(1);
      expect(result.ops[0].retain).toBeDefined();
      expect(result.ops[0].retain).toEqual({
        delta: [{ insert: 'b' }, { insert: 'a' }],
      });
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});