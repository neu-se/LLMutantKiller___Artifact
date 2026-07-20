import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta invert with object retain", () => {
  it("should correctly handle object retain type checking", () => {
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

    // The mutated code will fail this test because it replaces
    // `typeof op.retain === 'object'` with `true`, which will
    // cause the code to incorrectly process the retain operation
    // when it's not actually an object type
    expect(inverted.ops[0]).toHaveProperty('retain');
    expect(typeof inverted.ops[0].retain).toBe('object');
    expect(inverted.ops[0].retain).not.toBeNull();
    expect(inverted.ops[0].retain).toHaveProperty('test');
    expect(inverted.ops[0].retain.test).toEqual({ value: 7 });

    // Clean up
    Delta.unregisterEmbed("test");
  });
});