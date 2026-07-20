import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with embeds', () => {
  it('should correctly compose embeds with retain action', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a: number, b: number, keepNull: boolean) => a + b,
      invert: (a: number, b: number) => b - a,
      transform: (a: number, b: number, priority: boolean) => priority ? b : a,
    });

    const delta1 = new Delta().retain({ test: 5 });
    const delta2 = new Delta().retain({ test: 3 });

    const result = delta1.compose(delta2);
    const expectedOps = [{ retain: { test: 8 } }];

    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});