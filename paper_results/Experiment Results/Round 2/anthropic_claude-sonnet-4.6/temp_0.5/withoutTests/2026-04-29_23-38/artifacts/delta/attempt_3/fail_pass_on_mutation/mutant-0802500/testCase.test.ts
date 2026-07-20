import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose", () => {
  it("should not apply retain attributes to initial inserts when other starts with a plain retain", () => {
    // this has an insert with bold attribute
    // other retains with italic attribute
    // The optimization bypasses attribute composition for initial inserts
    const a = new Delta().insert("Hello", { bold: true });
    const b = new Delta().retain(5, { italic: true });
    
    const result = a.compose(b);
    // With optimization: insert("Hello", {bold:true}) is moved directly to ops,
    // then retain(5) in other is consumed, no attribute composition happens
    // Without optimization: insert("Hello", {bold:true}) goes through retain path,
    // attributes get composed: {bold:true, italic:true}
    expect(result.ops).toEqual([{ insert: "Hello", attributes: { bold: true, italic: true } }]);
  });
});