import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when thisData is an object and otherData is a number', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => priority ? b : a
    });

    const delta1 = new Delta([
      { retain: { test: 'value1' } }  // thisData is an object
    ]);

    const delta2 = new Delta([
      { retain: 3 }  // otherData is a number
    ]);

    const result = delta1.transform(delta2, true);
    // The mutation changes the condition from checking if thisData is an object
    // to always true, which should cause different behavior when thisData is an object
    // and otherData is not
    expect(result.ops.length).toBeGreaterThan(0);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});