import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with embeds', () => {
  it('should correctly handle null attributes when composing with retain action', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a: number, b: number, keepNull: boolean) => {
        if (keepNull) {
          return a;
        }
        return a + b;
      },
      invert: (a: number, b: number) => b - a,
      transform: (a: number, b: number, priority: boolean) => priority ? b : a,
    });

    const delta1 = new Delta().retain({ test: 5 }, null);
    const delta2 = new Delta().retain({ test: 3 }, null);

    const result = delta1.compose(delta2);
    const expectedOps = [{ retain: { test: 5 } }];

    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});