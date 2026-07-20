import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly transform when otherData is null with priority false", () => {
    Delta.registerEmbed("test", {
      compose: (_a, b) => b,
      invert: (_a, b) => b,
      transform: (_a, b) => b,
    });

    const delta1 = new Delta().retain({ test: "data1" });
    const delta2 = new Delta().retain({ test: null });

    const result = delta1.transform(delta2, false);
    const expectedOps = [{ retain: { test: null } }];

    expect(result.ops).toEqual(expectedOps);

    Delta.unregisterEmbed("test");
  });
});