import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert with embed', () => {
  it('should correctly handle object retain with null value during inversion', () => {
    // Setup a custom embed handler for testing
    const embedType = 'custom';
    Delta.registerEmbed(embedType, {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => b
    });

    // Create a base delta with an embed insert
    const base = new Delta().insert({ [embedType]: 'test-data' });

    // Create a delta to invert that retains an object with null value
    const delta = new Delta().retain({ [embedType]: null }, { bold: true });

    // Invert the delta
    const inverted = delta.invert(base);

    // The original code should skip this case (op.retain !== null)
    // The mutated code will process it (true instead of op.retain !== null)
    // So we expect different behavior between original and mutated
    expect(inverted.ops.length).toBeGreaterThan(0);

    // Clean up
    Delta.unregisterEmbed(embedType);
  });
});