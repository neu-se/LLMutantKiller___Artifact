import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('two retain ops both with attributes - retain value in result should not be boolean true', () => {
    const a = new Delta().retain(1, { color: 'blue' });
    const b = new Delta().retain(1, { bold: true, color: 'red' });
    // priority=false: b's attributes win, so result has {bold:true, color:'red'}
    // otherData=1 (number), else branch: original=false, mutated=true
    // retain(false, {bold:true,color:'red'}) -> {retain:false, attributes:{bold:true,color:'red'}}
    // retain(true, {bold:true,color:'red'}) -> {retain:true, attributes:{bold:true,color:'red'}}
    const result = a.transform(b, false);
    expect(result.ops).toHaveLength(1);
    // In original code, retain value is false (not true)
    expect(result.ops[0].retain).not.toBe(true);
    expect(result.ops[0].retain).toBe(false);
  });
});