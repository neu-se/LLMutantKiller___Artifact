import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('transform() with null retain', () => {
  it('should use length when otherData is null (not treat null as valid object retain)', () => {
    // Create a delta with a retain op where retain is explicitly null
    // This tests the condition: typeof otherData === 'object' && otherData !== null
    // Original: null retain -> transformedData = length (number)
    // Mutated: null retain -> transformedData = null (wrong)
    const a = new Delta([{ retain: 5 }]);
    const b = new Delta([{ retain: null as any }]);
    
    // With the original code, transformedData = length = 5
    // With the mutated code, transformedData = null
    const result = a.transform(b, false);
    
    // The result should have a numeric retain, not null
    expect(result.ops.length).toBeGreaterThan(0);
    expect(typeof result.ops[0].retain).toBe('number');
    expect(result.ops[0].retain).toBe(5);
  });
});