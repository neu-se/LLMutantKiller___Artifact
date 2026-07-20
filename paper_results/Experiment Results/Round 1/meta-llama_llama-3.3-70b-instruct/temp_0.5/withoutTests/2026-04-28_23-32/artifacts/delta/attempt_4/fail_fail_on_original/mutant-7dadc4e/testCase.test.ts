import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta", () => {
  it("should transform correctly when otherData is null", () => {
    const delta1 = new Delta();
    delta1.retain(1, { foo: "bar" });
    const delta2 = new Delta();
    delta2.retain(1, { baz: "qux" });
    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops.length).toBe(1);
    expect(transformedDelta.ops[0].retain).toBe(1);
    expect(transformedDelta.ops[0].attributes).toEqual({ foo: "bar", baz: "qux" });
  });
});