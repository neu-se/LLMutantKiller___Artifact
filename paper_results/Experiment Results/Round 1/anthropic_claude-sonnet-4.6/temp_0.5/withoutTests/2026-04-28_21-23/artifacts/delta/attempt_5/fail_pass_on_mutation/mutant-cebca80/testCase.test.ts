import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert", () => {
  it("should correctly track base index when inverting retain followed by delete", () => {
    // retain 1 (no attrs) then retain 1 with attrs
    // With mutation: baseIndex not advanced after first retain(no attrs returns early),
    // wait - retain with no attrs returns early before reaching this code
    // Let's use retain WITH attrs so it enters the forEach branch
    // retain(1, {bold}) then retain(1, {italic})
    // base = "ab" where "a" has no attrs and "b" has no attrs
    // inverted should be retain(1, {bold:null}), retain(1, {italic:null})
    // With mutation: baseIndex stays 0 after first op, second op slices base[0,1]="a" again
    // So second retain gets attributes from "a" not "b" - but "a" has no attrs either
    // AttributeMap.invert({italic:true}, undefined) = {italic:null} regardless
    // So same result... need base ops with different attributes
    
    const base = new Delta()
      .insert("a", { color: "red" })
      .insert("b", { color: "blue" });
    const change = new Delta().retain(1, { bold: true }).retain(1, { bold: true });
    const inverted = change.invert(base);
    // First retain: base "a" has {color:red}, inverted retain(1, {bold:null, color:red})? 
    // No - AttributeMap.invert({bold:true}, {color:red}) = {bold:null}
    // Second retain: base "b" has {color:blue}
    // With mutation: slices "a" again -> AttributeMap.invert({bold:true}, {color:red}) = {bold:null}
    // Same result again...
    
    // Need a case where the BASE OP ATTRIBUTES affect the inverted attributes
    // AttributeMap.invert(opAttrs, baseAttrs) - baseAttrs matter when opAttrs sets something to null
    const base2 = new Delta()
      .insert("a", { bold: true })
      .insert("b", { bold: false });
    const change2 = new Delta()
      .retain(1, { bold: null })  // remove bold from "a"
      .retain(1, { bold: null }); // remove bold from "b"
    const inverted2 = change2.invert(base2);
    // First: invert({bold:null}, {bold:true}) -> {bold:true}
    // Second: invert({bold:null}, {bold:false}) -> {bold:false}
    // With mutation: baseIndex stays 0, second slices "a" again
    // Second: invert({bold:null}, {bold:true}) -> {bold:true}  (WRONG!)
    expect(inverted2.ops).toEqual([
      { retain: 1, attributes: { bold: true } },
      { retain: 1, attributes: { bold: false } },
    ]);
  });
});