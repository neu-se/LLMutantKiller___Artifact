import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when thisData is an object but otherData is not', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? b : a
    });

    const delta1 = new Delta([
      { retain: { test: 'value1' } }  // thisData is an object
    ]);

    const delta2 = new Delta([
      { retain: 5 }  // otherData is a number, not an object
    ]);

    const result = delta1.transform(delta2, true);
    const expectedOps: Op[] = [
      { retain: 5 }
    ];

    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});