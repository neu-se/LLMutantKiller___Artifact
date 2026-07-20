import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert", () => {
  it("should correctly invert delete followed by retain-with-attributes", () => {
    const base = new Delta().insert("a").insert("b", { bold: true });
    const change = new Delta().delete(1).retain(1, { bold: null });
    const inverted = change.invert(base);
    // Original:
    //   delete op: slice(0,1)="a", push "a", return 0+1=1
    //   retain(1,{bold:null}): slice(1,2)="b"{bold:true}, retain(1,{bold:true}), return 1+1=2
    //   inverted = [{insert:"a"}, {retain:1, attributes:{bold:true}}]
    // Mutation:
    //   delete op: slice(0,1)="a", push "a", return 0 (no advancement!)
    //   retain(1,{bold:null}): slice(0,1)="a"{no attrs}, retain(1,{bold:null? or nothing}), return 0
    //   AttributeMap.invert({bold:null}, undefined) = {} -> no attributes
    //   inverted = [{insert:"a"}, {retain:1}] (chop removes trailing retain)
    //   Actually inverted = [{insert:"a"}]
    expect(inverted.ops).toEqual([
      { insert: "a" },
      { retain: 1, attributes: { bold: true } },
    ]);
  });
});