import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain an embed with an embed does not throw and produces a retain op', () => {
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
      // Mutated code sets action='' causing thisOp[''] = undefined, which causes
      // getEmbedTypeAndData to throw "cannot retain a undefined"
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      // Original code: succeeds and produces a retain op
      // Mutated code: throws because thisOp[''] is undefined
      expect(() => {
        const result = a.compose(b);
        expect(result.ops[0].retain).toBeDefined();
      }).not.toThrow();
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});