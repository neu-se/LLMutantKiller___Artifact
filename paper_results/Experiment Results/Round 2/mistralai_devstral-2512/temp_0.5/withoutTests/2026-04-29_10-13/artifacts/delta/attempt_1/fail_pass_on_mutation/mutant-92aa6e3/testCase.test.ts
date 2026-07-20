import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Delta compose with embeds', () => {
  it('should correctly compose embeds with retain action', () => {
    // Setup a custom embed handler for testing
    const embedType = 'custom';
    Delta.registerEmbed(embedType, {
      compose: (a, b, keepNull) => {
        // This should be called with keepNull = true when action is 'retain'
        // and keepNull = false when action is 'insert'
        return { composed: a, b, keepNull };
      },
      invert: (a, b) => ({ inverted: a, b }),
      transform: (a, b, priority) => ({ transformed: a, b, priority }),
    });

    // Create deltas with embeds that will trigger the compose during composition
    const delta1 = new Delta().retain({ [embedType]: { data: 'first' } });
    const delta2 = new Delta().retain({ [embedType]: { data: 'second' } });

    // Compose the deltas
    const result = delta1.compose(delta2);

    // Verify the result has the expected structure
    expect(result.ops).toHaveLength(1);
    expect(result.ops[0]).toHaveProperty('retain');
    expect(result.ops[0].retain).toHaveProperty(embedType);

    // The composed data should contain keepNull: true because action was 'retain'
    const composedData = result.ops[0].retain[embedType];
    expect(composedData).toHaveProperty('keepNull', true);
    expect(composedData).toHaveProperty('composed', { data: 'first' });
    expect(composedData).toHaveProperty('b', { data: 'second' });

    // Clean up
    Delta.unregisterEmbed(embedType);
  });
});