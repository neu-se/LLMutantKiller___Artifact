import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with initial retain", () => {
  it("should correctly handle case where first delta has no inserts before retain", () => {
    const delta1 = new Delta().delete(2);
    const delta2 = new Delta().retain(3).insert("X");
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ delete: 2 }, { retain: 3 }, { insert: "X" }]);
  });
});