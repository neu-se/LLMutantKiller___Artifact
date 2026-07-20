import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta", () => {
  it("should transform correctly when otherData is object", () => {
    const delta1 = new Delta();
    delta1.retain({ foo: "bar" }, {});
    const delta2 = new Delta();
    delta2.retain({ foo: "baz" }, {});
    Delta.registerEmbed("foo", {
      compose: (a, b, keepNull) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? b : a,
    });
    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops.length).toBe(1);
    expect(transformedDelta.ops[0].retain).toEqual({ foo: "bar" });
  });
});