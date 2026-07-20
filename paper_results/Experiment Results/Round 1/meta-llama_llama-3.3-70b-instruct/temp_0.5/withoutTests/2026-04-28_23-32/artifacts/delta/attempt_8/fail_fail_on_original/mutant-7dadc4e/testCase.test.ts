import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta", () => {
  it("should transform correctly when otherData is object", () => {
    const delta1 = new Delta();
    delta1.retain(1, {});
    const delta2 = new Delta();
    delta2.retain(1, {});
    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops.length).toBe(0);
    const delta3 = new Delta();
    delta3.retain(1, { foo: "bar" });
    const delta4 = new Delta();
    delta4.retain(1, { foo: "baz" });
    const transformedDelta2 = delta3.transform(delta4, true);
    expect(transformedDelta2.ops.length).toBe(1);
    expect(transformedDelta2.ops[0].retain).toBe(1);
    expect(transformedDelta2.ops[0].attributes).toEqual({ foo: "bar" });
  });
});