import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Delta transform with embeds', () => {
  it('should correctly transform embeds when both thisData and otherData are objects', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b, priority) => priority ? b : a,
    });

    const thisDelta = new Delta([
      { retain: { test: 'value1' } },
    ]);

    const otherDelta = new Delta([
      { retain: { test: 'value2' } },
    ]);

    const result = thisDelta.transform(otherDelta, true);
    const expectedOps = [{ retain: { test: 'value2' } }];
    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});