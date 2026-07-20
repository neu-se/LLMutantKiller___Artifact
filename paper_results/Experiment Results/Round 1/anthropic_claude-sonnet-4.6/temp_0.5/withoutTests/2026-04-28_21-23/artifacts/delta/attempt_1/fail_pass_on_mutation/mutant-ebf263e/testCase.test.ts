import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization for leading retain", () => {
  it("should correctly compose when other starts with a plain retain followed by content, preserving leading inserts from this", () => {
    // 'this' delta: insert "AB" then insert "CD"
    // 'other' delta: retain 2 (covers "AB"), then delete 2 (removes "CD")
    // Expected result: insert "AB" (the retain keeps AB, delete removes CD)
    const base = new Delta().insert("AB").insert("CD");
    const change = new Delta().retain(2).delete(2);
    
    const result = base.compose(change);
    
    // The result should be just insert "AB"
    const expected = new Delta().insert("AB");
    expect(result.ops).toEqual(expected.ops);
  });
});