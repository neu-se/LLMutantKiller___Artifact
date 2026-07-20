import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Delta transform with embeds', () => {
  it('should correctly transform embeds when both operations have object retains', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? b : a
    });

    const delta1 = new Delta([
      { retain: { test: 'value1' } }
    ]);

    const delta2 = new Delta([
      { retain: { test: 'value2' } }
    ]);

    const result = delta1.transform(delta2, true);
    const expectedOps: Op[] = [
      { retain: { test: 'value2' } }
    ];

    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});