// <Jest test file containing exactly one test case>
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('getEmbedTypeAndData null check', () => {
  it('should throw an error when b (insert) is null in invert', () => {
    // Register a handler for the embed type
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => ({}),
      invert: (a: unknown, b: unknown) => ({}),
      transform: (a: unknown, b: unknown, priority: boolean) => ({}),
    });

    try {
      // Create a delta that retains an embed object
      const delta = new Delta([{ retain: { image: { src: 'url' } } }]);
      
      // Create a base delta with null as the insert value
      // This simulates a scenario where baseOp.insert is null
      const base = new Delta([{ insert: null as any }]);
      
      // In the original code, getEmbedTypeAndData checks `b === null` and throws
      // In the mutated code, this check is removed (replaced with `false`), so it won't throw
      expect(() => {
        delta.invert(base);
      }).toThrow('cannot retain a');
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});