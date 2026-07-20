import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert mutation detection', () => {
  it('should not throw error when inverting delta with number retain that has no attributes', () => {
    // Register a handler to ensure embed handling works
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });
    
    const base = new Delta().insert('hello');
    // retain(0) - a zero-length retain that is falsy
    // In original: branch 2 fails (0 is falsy), branch 3 fails (0 is falsy), branch 4 fails (typeof 0 !== 'object')
    // In mutated: branch 4 becomes true && 0 !== null = true, tries embed handling on number 0 → throws
    const delta = new Delta([{ retain: 0 }]);
    expect(() => delta.invert(base)).not.toThrow();
    
    Delta.unregisterEmbed('image');
  });
});