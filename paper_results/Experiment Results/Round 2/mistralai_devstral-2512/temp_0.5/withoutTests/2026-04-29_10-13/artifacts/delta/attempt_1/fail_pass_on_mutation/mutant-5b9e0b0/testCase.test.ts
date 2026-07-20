import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with embed objects", () => {
  it("should correctly compose embed objects when thisOp has no retain", () => {
    // Register a custom embed handler for testing
    Delta.registerEmbed("custom", {
      compose: (a, b, keepNull) => ({ ...a, ...b }),
      invert: (a, b) => ({}),
      transform: (a, b, priority) => ({}),
    });

    const delta1 = new Delta().insert({ custom: { id: 1 } });
    const delta2 = new Delta().retain({ custom: { id: 2 } });

    const result = delta1.compose(delta2);
    const ops = result.ops;

    expect(ops.length).toBe(1);
    expect(ops[0].insert).toEqual({ custom: { id: 1, ...{ id: 2 } } });

    Delta.unregisterEmbed("custom");
  });
});