import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('retain number + retain number produces a numeric retain op not a boolean retain', () => {
    const a = new Delta().retain(2);
    const b = new Delta().retain(2);
    const result = a.transform(b, true);
    // The result should be a retain with numeric value 2, not boolean true/false
    const expected = new Delta().retain(2);
    expect(result).toEqual(expected);
    expect(result.ops.length).toEqual(1);
    expect(typeof result.ops[0].retain).toEqual('number');
  });
});