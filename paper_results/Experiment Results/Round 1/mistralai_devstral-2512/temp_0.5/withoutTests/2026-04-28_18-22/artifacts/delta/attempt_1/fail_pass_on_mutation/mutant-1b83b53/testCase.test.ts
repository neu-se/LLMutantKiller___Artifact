import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Delta compose with embeds', () => {
  it('should correctly compose embeds with retain action', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b) => b
    });

    const delta1 = new Delta().retain({ test: 'value1' });
    const delta2 = new Delta().retain({ test: 'value2' });

    const result = delta1.compose(delta2);
    const expectedOps = [{ retain: { test: 'value2' } }];

    expect(result.ops).toEqual(expectedOps);
  });
});