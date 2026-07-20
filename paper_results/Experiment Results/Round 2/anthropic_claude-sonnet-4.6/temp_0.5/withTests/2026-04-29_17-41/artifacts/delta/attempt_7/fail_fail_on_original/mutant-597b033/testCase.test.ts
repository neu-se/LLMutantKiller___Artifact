import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("transformPosition", () => {
  it("insert at exact boundary where offset equals index", () => {
    // delta with insert of length 3 at offset 0
    // index = 3, offset starts at 0
    // loop condition: offset <= index means we process when offset=0,1,2,3
    // after processing insert(length=3): offset becomes 3, index becomes 3+3=6
    // then offset(3) <= index(6), continues...
    const delta = new Delta().insert("ABC").retain(5);
    expect(delta.transformPosition(3, false)).toEqual(6);
    expect(delta.transformPosition(3, true)).toEqual(3);
  });
});