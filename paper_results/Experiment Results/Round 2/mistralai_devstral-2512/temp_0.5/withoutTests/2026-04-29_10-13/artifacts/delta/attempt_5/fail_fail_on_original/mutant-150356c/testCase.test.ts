import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with initial retain", () => {
  it("should correctly handle initial retain when composing with insert", () => {
    const delta1 = new Delta().insert("original");
    const delta2 = new Delta().retain(3).insert("new");
    const result = delta1.compose(delta2);
    const expected = new Delta().insert("new").insert("iginal");
    expect(result.ops).toEqual(expected.ops);
  });
});