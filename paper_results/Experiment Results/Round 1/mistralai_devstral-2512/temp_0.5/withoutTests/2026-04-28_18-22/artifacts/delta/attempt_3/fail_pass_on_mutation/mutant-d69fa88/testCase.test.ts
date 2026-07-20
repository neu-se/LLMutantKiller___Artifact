import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta invert with object retain", () => {
  it("should correctly handle object retain in invert operation", () => {
    // Setup a custom embed handler for testing
    interface TestEmbed {
      value: number;
    }

    Delta.registerEmbed<TestEmbed>("test", {
      compose: (a, b) => ({ value: a.value + b.value }),
      invert: (a, b) => ({ value: b.value - a.value }),
      transform: (a, b) => ({ value: a.value + b.value }),
    });

    // Create a base delta with an embed
    const base = new Delta().insert({ test: { value: 10 } });

    // Create a delta to invert that retains the embed with attributes
    const delta = new Delta().retain({ test: { value: 3 } }, { bold: true });

    // Invert the delta
    const inverted = delta.invert(base);

    // The inverted delta should have exactly one operation
    expect(inverted.ops.length).toBe(1);

    // The operation should be a retain with the correct embed type
    const op = inverted.ops[0];
    expect(op).toHaveProperty('retain');
    expect(typeof op.retain).toBe('object');
    expect(op.retain).not.toBeNull();
    expect(op.retain).toHaveProperty('test');
    expect(op.retain.test).toEqual({ value: 7 });

    // Clean up
    Delta.unregisterEmbed("test");
  });
});