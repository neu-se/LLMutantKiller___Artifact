import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose()", () => {
  it("retain start optimization where other retain is partially consumed causing different iteration state", () => {
    // When other starts with retain(2) but this only has 1 insert before non-insert
    // The optimization consumes the insert and advances otherIter by 1
    // Without optimization, the retain(2) is processed differently in main loop
    const a = new Delta().insert("X").retain(1, { color: "red" });
    const b = new Delta().retain(2, null).insert("Y");
    const expected = new Delta()
      .insert("X")
      .retain(1, { color: "red" })
      .insert("Y");
    expect(a.compose(b)).toEqual(expected);
  });
});