import Delta from "../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization", () => {
  it("should correctly compose when other starts with a plain retain and this has inserts", () => {
    // this = insert("AB"), other = retain(1) + insert("X") + retain(1)
    // Expected: insert("A") + insert("X") + insert("B")
    const delta1 = new Delta().insert("AB");
    const delta2 = new Delta().retain(1).insert("X").retain(1);
    const result = delta1.compose(delta2);
    expect(result).toEqual(new Delta().insert("AXB"));
  });
});