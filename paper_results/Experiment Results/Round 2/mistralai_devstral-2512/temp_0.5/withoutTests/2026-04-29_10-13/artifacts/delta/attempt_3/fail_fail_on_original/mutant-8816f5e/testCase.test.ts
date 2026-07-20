import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly transform embeds when one is an object and the other is a number", () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed("test", {
      compose: (_a: any, b: any) => b,
      invert: (a: any, _b: any) => a,
      transform: (_a: any, b: any) => b,
    });

    const delta1 = new Delta().retain({ test: "data1" });
    const delta2 = new Delta().retain(5);

    const result = delta1.transform(delta2, true);
    const ops = result.ops;

    expect(ops.length).toBe(1);
    expect(ops[0].retain).toBe(5);
    expect(ops[0].attributes).toBeUndefined();
  });
});