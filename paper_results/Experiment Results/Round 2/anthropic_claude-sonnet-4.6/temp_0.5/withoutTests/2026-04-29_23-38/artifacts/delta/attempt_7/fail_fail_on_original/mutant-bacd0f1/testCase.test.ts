import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("transform with priority produces correct result for retain-retain", () => {
    const a = new Delta().retain(3, { color: 'red' });
    const b = new Delta().retain(3, { color: 'blue' });
    
    // With priority=true, a's attributes take precedence
    const result = a.transform(b, true);
    
    // transformedData = 3 (both original and mutated give same)
    // AttributeMap.transform({color:'red'}, {color:'blue'}, true) = {} (red wins, blue loses)
    expect(result.ops).toEqual([{ retain: 3, attributes: { color: 'blue' } }]);
  });
});