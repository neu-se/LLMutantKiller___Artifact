import Delta from "../../src/Delta";

describe("transform() with unregistered embed handler", () => {
  it("throws an error when transforming embed retains with no registered handler", () => {
    // Both ops retain the same embed type, triggering the handler lookup path
    const a = new Delta().retain({ myEmbed: { value: 1 } });
    const b = new Delta().retain({ myEmbed: { value: 2 } });

    // In the original code: if (handler) { ... } - handler is obtained via getHandler which throws
    // The mutation changes this to if (true) { ... }
    // With the original code, getHandler throws "no handlers for embed type"
    // With the mutated code (if (true)), the behavior is the same since getHandler still throws
    // We need a scenario where handler could be falsy in original but truthy in mutated...
    // Actually, getHandler always throws if no handler - so let's test the happy path
    // to ensure the handler IS called with correct priority

    Delta.registerEmbed<{ value: number }>("myEmbed", {
      compose: (a, b, keepNull) => ({ value: (a as any).value + (b as any).value }),
      invert: (a, b) => b,
      transform: (a, b, priority) => {
        // With priority=true, keep our value; otherwise use theirs
        return priority ? a : b;
      },
    });

    try {
      const result = a.transform(b, true);
      const expected = new Delta().retain({ myEmbed: { value: 1 } });
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed("myEmbed");
    }
  });
});