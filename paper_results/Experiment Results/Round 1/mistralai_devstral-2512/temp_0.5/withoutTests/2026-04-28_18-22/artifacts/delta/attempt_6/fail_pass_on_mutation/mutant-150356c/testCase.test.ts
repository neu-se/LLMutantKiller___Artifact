import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with initial retain", () => {
  it("should not enter infinite loop when first delta has insert and second has retain", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().retain(3).insert("X");
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "tesXt" }]);
  });
});