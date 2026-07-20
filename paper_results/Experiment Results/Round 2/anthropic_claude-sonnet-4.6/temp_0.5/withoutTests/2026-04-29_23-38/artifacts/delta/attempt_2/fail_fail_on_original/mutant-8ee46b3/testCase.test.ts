import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should produce different ops for false vs true in transformedData', () => {
    const a = new Delta().retain(3);
    const b = new Delta().retain(3);
    const result = a.transform(b, false);
    // Original: transformedData = false -> retain(false) -> {retain: false}
    // Mutated: transformedData = true -> retain(true) -> {retain: true}
    // Check that the retain value is not true (boolean)
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].retain).not.toBe(true);
  });
});