import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("transforms retain ops correctly when both have number retains with attributes", () => {
    const a = new Delta().retain(3, { color: 'red' });
    const b = new Delta().retain(3, { bold: true });
    const result = a.transform(b, false);
    // AttributeMap.transform({color:'red'}, {bold:true}, false) = {bold:true}
    expect(result.ops).toEqual([{ retain: 3, attributes: { bold: true } }]);
  });
});