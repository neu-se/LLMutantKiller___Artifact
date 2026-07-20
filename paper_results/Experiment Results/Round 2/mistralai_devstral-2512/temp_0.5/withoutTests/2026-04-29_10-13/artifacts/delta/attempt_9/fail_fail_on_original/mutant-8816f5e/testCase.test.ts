import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly transform when thisData is object and otherData is number", () => {
    Delta.registerEmbed("test", {
      compose: (_a: any, b: any) => b,
      invert: (a: any, _b: any) => a,
      transform: (_a: any, b: any) => b,
    });

    const delta1 = new Delta().retain({ test: "data1" });
    const delta2 = new Delta().retain(5);

    const result = delta1.transform(delta2, true);
    expect(result.ops).toEqual([{ retain: 5 }]);
  });
});