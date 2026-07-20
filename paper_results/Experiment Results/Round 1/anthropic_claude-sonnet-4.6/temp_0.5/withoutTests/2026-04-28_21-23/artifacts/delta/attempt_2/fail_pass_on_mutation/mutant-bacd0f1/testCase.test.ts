import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should use length as transformedData for numeric retain, not otherData when condition differs', () => {
    // When thisOp is a retain with attributes and otherOp is a plain retain,
    // the result should retain with transformed attributes
    // After chop(), retains with attributes are kept
    const a = new Delta().retain(5, { bold: true });
    const b = new Delta().retain(5, { italic: true });
    
    // a.transform(b, false): 
    // thisOp = retain(5, {bold:true}), otherOp = retain(5, {italic:true})
    // transformedData: original=false->length=5, mutated=true->otherData=5 (same!)
    // attributes: AttributeMap.transform({bold:true}, {italic:true}, false) = {italic:true}
    // result: retain(5, {italic:true}) - not chopped since has attributes
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: 5, attributes: { italic: true } }]);
  });
});