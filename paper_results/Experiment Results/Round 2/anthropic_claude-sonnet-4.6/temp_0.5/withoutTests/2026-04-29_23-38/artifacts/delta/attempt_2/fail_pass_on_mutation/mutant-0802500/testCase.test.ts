import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose", () => {
  it("should preserve initial inserts from this when other starts with a retain covering them", () => {
    const a = new Delta().insert("AB").insert("CD");
    const b = new Delta().retain(4).insert("X");
    
    const result = a.compose(b);
    // Expected: all original content preserved plus the insertion
    // "ABCD" with "X" appended = "ABCDX"
    expect(result.ops).toEqual([{ insert: "ABCDX" }]);
  });
});