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

    // The mutated code will incorrectly handle this case because
    // the condition `typeof op.retain === 'object'` is replaced with `true`
    // This will cause the code to try to process non-object retains as objects
    expect(inverted.ops.length).toBe(1);
    expect(inverted.ops[0]).toHaveProperty('retain');
    expect(inverted.ops[0].retain).toEqual({ test: { value: 7 } });

    // Clean up
    Delta.unregisterEmbed("test");
  });
});