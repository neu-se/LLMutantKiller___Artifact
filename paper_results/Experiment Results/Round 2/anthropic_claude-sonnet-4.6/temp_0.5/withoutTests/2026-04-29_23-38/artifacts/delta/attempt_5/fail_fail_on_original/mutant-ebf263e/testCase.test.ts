import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization", () => {
  it("correctly composes inserts from this with retain+delete+insert in other", () => {
    // Document: "XY" -> this applies insert("A") at start -> "AXY"
    // other: retain(1), delete(1), insert("B") -> on "AXY" keeps "A", deletes "X", inserts "B" -> "ABY"
    const a = new Delta().retain(1).insert("A").retain(1);
    const b = new Delta().retain(1).delete(1).insert("B").retain(1);
    const result = a.compose(b);
    expect(result).toEqual(new Delta().retain(1).insert("B").retain(1));
  });
});