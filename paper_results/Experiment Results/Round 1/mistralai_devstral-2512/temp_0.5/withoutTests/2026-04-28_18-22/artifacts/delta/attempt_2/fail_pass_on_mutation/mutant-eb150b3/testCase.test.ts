import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with embeds and attributes', () => {
  it('should preserve null attributes when composing retains with embeds', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a: number, b: number, keepNull: boolean) => a + b,
      invert: (a: number, b: number) => b - a,
      transform: (a: number, b: number, priority: boolean) => priority ? b : a,
    });

    const delta1 = new Delta().retain({ test: 5 }, null);
    const delta2 = new Delta().retain({ test: 3 }, { bold: true });

    const result = delta1.compose(delta2);
    const expectedOps = [{ retain: { test: 8 }, attributes: { bold: true } }];

    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});