import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should produce correct retain value when transforming retain-number ops', () => {
    const a = new Delta().retain(3);
    const b = new Delta().retain(3).insert('x');
    const result = a.transform(b, false);
    // Original: transformedData = length = 3 -> {retain: 3}
    // Mutated: transformedData = true -> {retain: true}
    expect(result.ops[0]).toEqual({ retain: 3 });
  });
});