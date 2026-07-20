import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert with object retain', () => {
  it('should correctly handle object retain operations during inversion', () => {
    // Setup: Register a simple embed handler for testing
    const testHandler = {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => ({ inverted: true, a, b }),
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    };
    Delta.registerEmbed('test', testHandler);

    // Create a base delta with an insert operation
    const base = new Delta().insert({ test: { id: 1 } });

    // Create a delta to invert that retains the embedded object
    const delta = new Delta().retain({ test: { id: 2 } }, { bold: true });

    // Invert the delta
    const inverted = delta.invert(base);

    // Verify the inverted delta has the correct structure
    expect(inverted.ops.length).toBe(1);
    expect(inverted.ops[0]).toHaveProperty('retain');
    expect(typeof inverted.ops[0].retain).toBe('object');
    expect(inverted.ops[0].retain).toHaveProperty('test');
    expect(inverted.ops[0].retain.test).toHaveProperty('inverted');
    expect(inverted.ops[0].retain.test.inverted).toBe(true);
    expect(inverted.ops[0].retain.test.a).toEqual({ id: 2 });
    expect(inverted.ops[0].retain.test.b).toEqual({ id: 1 });

    // Verify attributes are correctly inverted
    expect(inverted.ops[0]).toHaveProperty('attributes');
    expect(inverted.ops[0].attributes).toEqual({ bold: null });

    // Verify the operation is not a delete operation
    expect(inverted.ops[0]).not.toHaveProperty('delete');

    // Clean up
    Delta.unregisterEmbed('test');
  });
});