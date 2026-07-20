import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert with embed', () => {
  it('should correctly invert a retain operation with embed object', () => {
    // Setup a custom embed handler for testing
    const embedType = 'custom';
    Delta.registerEmbed(embedType, {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b) => b
    });

    // Create a base delta with an embed insert
    const base = new Delta().insert({ [embedType]: 'test-data' });

    // Create a delta to invert that retains the embed
    const delta = new Delta().retain({ [embedType]: 'retain-data' }, { bold: true });

    // Invert the delta
    const inverted = delta.invert(base);

    // Verify the inverted delta has the expected structure
    const expectedOps = [{ insert: { [embedType]: 'test-data' }, attributes: { bold: null } }];
    expect(inverted.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed(embedType);
  });
});