import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain-embed with retain-embed', () => {
  it('should not throw when composing retain-embed op with retain-embed op', () => {
    Delta.registerEmbed('e', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
    });

    try {
      // thisOp.retain is object (not null)
      // Original: action='retain', thisOp['retain'] = object embed -> valid
      // Mutated:  action='insert', thisOp['insert'] = undefined -> getEmbedTypeAndData throws
      const a = new Delta().retain({ e: 1 });
      const b = new Delta().retain({ e: 2 });
      
      expect(() => a.compose(b)).not.toThrow();
    } finally {
      Delta.unregisterEmbed('e');
    }
  });
});