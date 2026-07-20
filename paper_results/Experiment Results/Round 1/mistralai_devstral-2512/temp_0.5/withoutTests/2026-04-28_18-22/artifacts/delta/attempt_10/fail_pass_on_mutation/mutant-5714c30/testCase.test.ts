import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle null embed data during transform', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (_a: any, b: any) => b,
      invert: (a: any, _b: any) => a,
      transform: (a: any, b: any, priority: boolean) => priority ? a : b,
    });

    const delta1 = new Delta().retain({ test: null });
    const delta2 = new Delta().retain({ test: { key: 'value' } });

    // This should work in original code but fail in mutated version
    // due to incorrect null check logic in the placeholder condition
    expect(() => {
      const result = delta1.transform(delta2, true);
      expect(result.ops.length).toBeGreaterThan(0);
    }).not.toThrow();

    // Clean up
    Delta.unregisterEmbed('test');
  });
});