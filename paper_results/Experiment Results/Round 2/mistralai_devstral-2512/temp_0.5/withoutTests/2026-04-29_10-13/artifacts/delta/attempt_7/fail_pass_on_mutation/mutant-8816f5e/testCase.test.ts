import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly transform when both operands have object retains", () => {
    Delta.registerEmbed("test", {
      compose: (_a: any, b: any) => b,
      invert: (a: any, _b: any) => a,
      transform: (_a: any, b: any) => b,
    });

    const delta1 = new Delta().retain({ test: "data1" });
    const delta2 = new Delta().retain({ test: "data2" });

    const result = delta1.transform(delta2, true);
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].retain).toEqual({ test: "data2" });
  });
});