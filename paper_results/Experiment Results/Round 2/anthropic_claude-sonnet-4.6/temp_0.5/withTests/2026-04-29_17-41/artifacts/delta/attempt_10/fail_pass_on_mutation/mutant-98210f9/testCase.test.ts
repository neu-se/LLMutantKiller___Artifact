import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain embed mutation', () => {
  it('composing retain embed with retain embed produces retain (not insert) in result', () => {
    Delta.registerEmbed('em', {
      compose: (_a: unknown, _b: unknown, _keepNull: boolean) => ({ composed: true }),
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({}),
      invert: (_a: unknown, _b: unknown) => ({}),
    });

    try {
      // Compose a retain embed with a retain embed
      // Then compose the result with a delete to verify the result type
      // If result has 'retain' (original), composing with delete(1) gives delete(1)
      // If result has 'insert' (mutated), composing with delete(1) gives empty delta
      const a = new Delta().retain({ em: { v: 1 } });
      const b = new Delta().retain({ em: { v: 2 } });

      const composed = a.compose(b);
      const withDelete = composed.compose(new Delta().delete(1));

      // Original: composed has retain embed, delete(1) removes a retained position -> delete(1)
      // Mutated: composed has insert embed, delete(1) cancels the insert -> empty delta
      expect(withDelete.ops).toHaveLength(1);
      expect(withDelete.ops[0]).toHaveProperty('delete', 1);
    } finally {
      Delta.unregisterEmbed('em');
    }
  });
});