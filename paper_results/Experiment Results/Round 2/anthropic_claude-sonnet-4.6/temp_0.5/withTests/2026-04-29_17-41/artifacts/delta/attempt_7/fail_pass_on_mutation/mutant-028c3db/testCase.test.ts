import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() retain start optimization merging", () => {
  it("should merge consecutive inserts when other starts with plain retain", () => {
    const a = new Delta().insert("A").insert("B").delete(1);
    const b = new Delta().retain(2);
    const expected = new Delta().insert("A").insert("B").delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});