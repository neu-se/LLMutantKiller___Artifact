import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with two retain-embed ops', () => {
  it('result op must have retain key not insert key when composing retain-embed with retain-embed', () => {
    Delta.registerEmbed('myembed', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
      invert: (a: unknown, b: unknown) => b,
    });

    try {
      const a = new Delta().retain({ myembed: 'a' });
      const b = new Delta().retain({ myembed: 'b' });
      const composed = a.compose(b);

      // Original: action='retain' => newOp = { retain: { myembed: 'b' } }
      // Mutated:  action='insert' => newOp = { insert: { myembed: 'b' } }
      expect(composed.ops).toHaveLength(1);
      expect(Object.keys(composed.ops[0])).toContain('retain');
      expect(Object.keys(composed.ops[0])).not.toContain('insert');
    } finally {
      Delta.unregisterEmbed('myembed');
    }
  });
});