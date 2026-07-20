import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when thisData is an object and otherData is a number', () => {
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
      { retain: 3 }  // otherData is a number
    ]);

    const result = delta1.transform(delta2, true);
    const expectedOps: Op[] = [
      { retain: 3 }
    ];

    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});