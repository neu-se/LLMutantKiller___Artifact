import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly transform when otherData is a number and thisData is an object with priority false", () => {
    Delta.registerEmbed("test", {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => (priority ? a : b),
    });

    const delta1 = new Delta().retain({ test: "A" });
    const delta2 = new Delta().retain(5);

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain(5);

    expect(result.ops).toEqual(expected.ops);
    Delta.unregisterEmbed("test");
  });
});