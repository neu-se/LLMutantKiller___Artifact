import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Delta compose with embeds and attributes', () => {
  it('should preserve null attributes when composing embeds with retain action', () => {
    // Setup a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a: number, b: number, keepNull: boolean) => {
        // This will behave differently based on keepNull parameter
        return keepNull ? a + b : (a + b) * 2;
      },
      invert: (a: number, b: number) => b - a,
      transform: (a: number, b: number, priority: boolean) => priority ? b : a,
    });

    const delta1 = new Delta().retain({ test: 5 }, null);
    const delta2 = new Delta().retain({ test: 3 }, null);

    const result = delta1.compose(delta2);
    const expectedOps: Op[] = [{ retain: { test: 8 } }];

    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});