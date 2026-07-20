import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert with object retain', () => {
  it('should correctly invert a delta with object retain operation', () => {
    // Setup: Register a simple embed handler for testing
    const testHandler = {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    };
    Delta.registerEmbed('test', testHandler);

    // Create a base delta with an insert operation
    const base = new Delta().insert({ test: { id: 1 } });

    // Create a delta to invert that retains the embedded object
    const delta = new Delta().retain({ test: { id: 2 } }, { bold: true });

    // Invert the delta
    const inverted = delta.invert(base);

    // Expected: The inverted delta should have a retain operation with the original data
    const expectedOps = [{ retain: { test: { id: 1 } }, attributes: {} }];
    expect(inverted.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});