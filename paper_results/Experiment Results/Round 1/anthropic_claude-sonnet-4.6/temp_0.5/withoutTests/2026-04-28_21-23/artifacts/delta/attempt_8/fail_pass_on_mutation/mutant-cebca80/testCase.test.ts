import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert", () => {
  it("should return correct baseIndex advancement for retain-with-attributes ops affecting subsequent ops", () => {
    // Use a retain(n, attrs) where n > 1 to ensure baseIndex advances by n
    // Then a delete that relies on correct baseIndex
    const base = new Delta().insert("aab");
    // retain 2 with attrs, then delete 1
    const change = new Delta().retain(2, { bold: true }).delete(1);
    const inverted = change.invert(base);
    // Original:
    //   retain(2,{bold:true}): slice(0,2)="aa", retain(2,{bold:null}), return 2
    //   delete(1): slice(2,3)="b", push "b", return 3
    //   inverted = [{retain:2,attrs:{bold:null}}, {insert:"b"}]
    // Mutation (if baseIndex not advanced):
    //   retain(2,{bold:true}): slice(0,2)="aa", retain(2,{bold:null}), return 0
    //   delete(1): slice(0,1)="a", push "a", return 0
    //   inverted = [{retain:2,attrs:{bold:null}}, {insert:"a"}]
    expect(inverted.ops).toEqual([
      { retain: 2, attributes: { bold: null } },
      { insert: "b" },
    ]);
  });
});