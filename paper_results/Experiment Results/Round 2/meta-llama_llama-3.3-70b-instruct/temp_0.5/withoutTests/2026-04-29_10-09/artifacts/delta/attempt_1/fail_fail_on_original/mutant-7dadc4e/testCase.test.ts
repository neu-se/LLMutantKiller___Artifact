import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform function", () => {
  it("should correctly transform data", () => {
    const delta1 = new Delta();
    delta1.retain({ foo: "bar" });
    const delta2 = new Delta();
    delta2.retain({ foo: "baz" });

    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops[0].retain).toEqual({ foo: "baz" });
  });
});