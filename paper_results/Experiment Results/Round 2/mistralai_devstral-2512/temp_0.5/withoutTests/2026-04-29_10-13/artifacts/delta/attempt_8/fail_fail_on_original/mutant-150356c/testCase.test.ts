import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with initial retain", () => {
  it("should correctly handle initial retain when composing with insert", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().retain(2).insert("XY");
    const result = delta1.compose(delta2);
    const expected = new Delta().insert("XY").insert("st");
    expect(result.ops).toEqual(expected.ops);
  });
});