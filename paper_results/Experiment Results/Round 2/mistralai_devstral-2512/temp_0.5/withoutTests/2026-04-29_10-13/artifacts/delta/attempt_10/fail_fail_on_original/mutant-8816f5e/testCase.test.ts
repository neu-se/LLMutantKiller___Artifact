import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should not transform embed when only otherData is object", () => {
    Delta.registerEmbed("test", {
      compose: (_a: any, b: any) => b,
      invert: (a: any, _b: any) => a,
      transform: (_a: any, b: any) => b,
    });

    const delta1 = new Delta().retain(5); // number
    const delta2 = new Delta().retain({ test: "data1" }); // object

    const result = delta1.transform(delta2, true);
    // Original code should not enter embed handling (both need to be objects)
    // Mutated code will enter embed handling (only otherData needs to be object)
    expect(result.ops).toEqual([{ retain: 5 }]);
  });
});