import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("should correctly transform embeds", () => {
    const delta1 = new Delta();
    delta1.retain({ test: "data" });

    const delta2 = new Delta();
    delta2.retain({ test: "otherData" });

    const transformedDelta = delta1.transform(delta2);

    expect(transformedDelta.ops[0].retain).toEqual({ test: "data" });
  });
});