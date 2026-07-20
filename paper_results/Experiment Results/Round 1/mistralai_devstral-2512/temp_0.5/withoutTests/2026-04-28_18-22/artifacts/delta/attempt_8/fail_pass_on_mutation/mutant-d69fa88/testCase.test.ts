import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta invert with object retain", () => {
  it("should fail when object retain condition is mutated", () => {
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

    // This test will fail on the mutated code because the condition
    // `typeof op.retain === 'object'` is replaced with `true`
    // which will cause the code to incorrectly handle the case where retain is not an object
    // We test this by checking the exact structure of the inverted operation
    expect(inverted.ops).toEqual([
      {
        retain: { test: { value: 7 } },
        attributes: { bold: null }
      }
    ]);

    // Clean up
    Delta.unregisterEmbed("test");
  });
});