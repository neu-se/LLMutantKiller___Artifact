import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("should correctly compose when this delta starts with retain and other starts with plain retain", () => {
    // this delta: retain 3, insert 'hello'
    // other delta: retain 5 (plain retain covering the 3 retain + 2 chars of 'hello')
    // Expected: retain 3, insert 'hello' (the plain retain in other preserves everything)
    
    // Let's use a simpler case:
    // this: retain(2), insert('abc')
    // other: retain(5) - plain retain covering all 5 chars (2 retained + 3 inserted)
    // Expected result: retain(2), insert('abc')
    
    const a = new Delta().retain(2).insert('abc');
    const b = new Delta().retain(5);
    
    const result = a.compose(b);
    
    // The composed result should preserve the original structure
    // retain(2) composed with retain(2) = retain(2)
    // insert('abc') composed with retain(3) = insert('abc')
    // So result should be: retain(2), insert('abc')
    expect(result.ops).toEqual([
      { retain: 2 },
      { insert: 'abc' }
    ]);
  });
});