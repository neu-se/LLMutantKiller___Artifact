import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when both operations have object retains with same embed type', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => priority ? b : a
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