import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose optimization for initial inserts", () => {
  it("should carry over initial inserts from this when other starts with a retain", () => {
    // this has inserts followed by more content
    // other starts with a retain that covers some of the content
    // The optimization should move the initial inserts to the front
    
    const a = new Delta().insert("Hello").insert(" World");
    const b = new Delta().retain(5).insert("!");
    
    const result = a.compose(b);
    
    // Expected: "Hello!" + " World" => insert("Hello"), insert("!"), insert(" World")
    // Actually: compose should give us "Hello! World"
    // The result should be: insert("Hello!") + insert(" World") or similar
    // Let's think more carefully:
    // a = [insert("Hello"), insert(" World")] -> effectively insert("Hello World")
    // b = [retain(5), insert("!")] -> retain first 5 chars, insert "!" after position 5
    // result should be: insert("Hello") + insert("!") + insert(" World")
    // which simplifies to insert("Hello! World")
    
    expect(result.ops).toEqual([{ insert: "Hello! World" }]);
  });
});