import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when both operations have object retains with different embed types', () => {
    // Register embed handlers for testing
    Delta.registerEmbed('test1', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? b : a
    });

    Delta.registerEmbed('test2', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? b : a
    });

    const delta1 = new Delta([
      { retain: { test1: 'value1' } }
    ]);

    const delta2 = new Delta([
      { retain: { test2: 'value2' } }
    ]);

    const result = delta1.transform(delta2, true);
    const expectedOps: Op[] = [
      { retain: { test2: 'value2' } }
    ];

    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('test1');
    Delta.unregisterEmbed('test2');
  });
});