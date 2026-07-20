import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform function", () => {
  it("should correctly transform data with null otherData", () => {
    const delta1 = new Delta();
    delta1.retain(10);
    const delta2 = new Delta();
    delta2.retain({});

    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops[0].retain).not.toEqual({});
  });
});