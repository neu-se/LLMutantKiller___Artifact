import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("should handle inserts from this that partially fit within the leading retain of other", () => {
    // this: insert("AB") [len 2], insert("CD") [len 2] = 4 chars
    // other: retain(3) then delete(1)
    // Original: "AB"(len2<=3) moved, firstLeft=1; "CD"(len2>1) not moved
    //   otherIter advances by 2, leaving retain(1) + delete(1)
    //   main loop: retain(1) vs insert("CD") -> insert("CD") kept, retain(1) consumed
    //   then delete(1) but nothing left -> result: insert("AB") + insert("CD") = insert("ABCD")... 
    // Hmm that doesn't seem right either
    
    const a = new Delta().insert("AB").insert("CD");
    const b = new Delta().retain(3).delete(1);
    const result = a.compose(b);
    // Expected: insert("ABC") - first 3 chars retained, last deleted
    const expected = new Delta().insert("ABC");
    expect(result).toEqual(expected);
  });
});