import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when thisData is not an object', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? b : a
    });

    const delta1 = new Delta([
      { retain: 5 }  // thisData is a number, not an object
    ]);

    const delta2 = new Delta([
      { retain: { test: 'value2' } }  // otherData is an object
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