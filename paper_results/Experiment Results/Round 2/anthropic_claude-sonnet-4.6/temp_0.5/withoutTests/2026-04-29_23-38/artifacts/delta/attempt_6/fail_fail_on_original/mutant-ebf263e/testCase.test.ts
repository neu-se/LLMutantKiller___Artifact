import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization", () => {
  it("handles case where this inserts partially fill others leading retain", () => {
    // this: insert("A") - 1 char
    // other: retain(2), insert("Z") - retains 2 but only 1 insert exists
    // With optimization: "A" fits in retain(2), firstLeft=1 remaining, otherIter advances by 1
    // Without optimization: different processing
    const a = new Delta().insert("A");
    const b = new Delta().retain(2).insert("Z");
    const result = a.compose(b);
    // "A" is kept, then "Z" is inserted
    expect(result).toEqual(new Delta().insert("AZ"));
  });
});