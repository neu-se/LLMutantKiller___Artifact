import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with leading retain in other", () => {
  it("should correctly compose when this starts with inserts followed by retain and other starts with plain retain", () => {
    // this: insert("abc") + retain(2) — total length affects 5 chars
    // other: retain(5) — retain all 5 chars
    const delta1 = new Delta().insert("abc").retain(2);
    const delta2 = new Delta().retain(5);
    
    const result = delta1.compose(delta2);
    
    // The compose of insert("abc") + retain(2) with retain(5) should be insert("abc") + retain(2)
    // (retaining everything is a no-op on inserts, and retain(2) stays)
    const expected = new Delta().insert("abc").retain(2);
    
    expect(result.ops).toEqual(expected.ops);
  });
});