import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with embed objects", () => {
  it("should correctly determine action type when composing embed objects", () => {
    // Register a custom embed handler for testing
    Delta.registerEmbed("custom", {
      compose: (a, b, keepNull) => ({ composed: true, a, b, keepNull }),
      invert: (a, b) => ({}),
      transform: (a, b, priority) => ({}),
    });

    const delta1 = new Delta().insert({ custom: { id: 1 } });
    const delta2 = new Delta().retain({ custom: { id: 2 } });

    const result = delta1.compose(delta2);
    const ops = result.ops;

    expect(ops.length).toBe(1);
    expect(ops[0].insert).toBeDefined();
    expect(ops[0].insert.custom).toEqual({
      composed: true,
      a: { id: 1 },
      b: { id: 2 },
      keepNull: true
    });

    Delta.unregisterEmbed("custom");
  });
});