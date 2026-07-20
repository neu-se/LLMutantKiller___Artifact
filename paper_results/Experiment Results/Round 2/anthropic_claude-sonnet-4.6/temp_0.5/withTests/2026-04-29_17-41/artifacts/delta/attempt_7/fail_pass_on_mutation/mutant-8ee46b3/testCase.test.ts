import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('retain + retain without priority gives correct retain value type', () => {
    // a has no attributes, b has attributes
    // With priority=false, b's attributes win fully
    // otherData = 1 (number), so else branch: original=false, mutated=true
    // delta.retain(false, {bold:true}) vs delta.retain(true, {bold:true})
    const a = new Delta().retain(1);
    const b = new Delta().retain(1, { bold: true });
    const result = a.transform(b, false);
    // Should produce {retain: 1, attributes: {bold: true}}
    expect(result.ops).toHaveLength(1);
    expect(result.ops[0].retain).toBe(1);
    expect(result.ops[0].attributes).toEqual({ bold: true });
  });
});