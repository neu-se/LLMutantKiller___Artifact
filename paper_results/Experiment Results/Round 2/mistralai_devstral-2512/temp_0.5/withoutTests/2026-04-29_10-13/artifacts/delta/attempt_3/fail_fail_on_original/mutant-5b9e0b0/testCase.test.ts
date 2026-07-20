import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with embed objects", () => {
  it("should correctly determine action type when composing embed objects", () => {
    Delta.registerEmbed("custom", {
      compose: (a, b, keepNull) => ({ composed: true, keepNull }),
      invert: (a, b) => ({}),
      transform: (a, b, priority) => ({}),
    });

    const delta1 = new Delta().insert({ custom: { id: 1 } });
    const delta2 = new Delta().retain({ custom: { id: 2 } });

    const result = delta1.compose(delta2);
    const ops = result.ops;

    expect(ops.length).toBe(1);
    expect(ops[0].insert).toBeDefined();
    expect((ops[0].insert as any).custom.keepNull).toBe(true);

    Delta.unregisterEmbed("custom");
  });
});