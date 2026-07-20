import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("correctly composes when other retains more than this inserts", () => {
    // this has only 1 char insert, other retains 5 (more than available)
    const a = new Delta().insert("A");
    const b = new Delta().retain(5);
    // compose should just give insert("A") since retain beyond length is chopped
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert("A"));
  });
});