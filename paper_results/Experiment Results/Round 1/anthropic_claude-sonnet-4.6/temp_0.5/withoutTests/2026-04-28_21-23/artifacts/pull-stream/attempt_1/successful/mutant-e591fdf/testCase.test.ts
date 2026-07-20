import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull mutation detection', () => {
  it('should not treat non-function with length 1 as partial sink', () => {
    // Create a simple through stream (function with length 1)
    // The mutation changes typeof a === 'function' to true
    // So passing a non-function with .length === 1 should behave differently
    
    // A string with length 1 is not a function, but has .length === 1
    // Original: doesn't enter partial sink branch (not a function)
    // Mutated: enters partial sink branch (length === 1)
    
    const str = 'x'; // length === 1, not a function
    
    // In original, this would not enter partial sink, would treat 'x' as read
    // In mutated, this would return a function (partial sink)
    const result = pull(str);
    
    // Original returns 'x' (the read value)
    // Mutated returns a function (partial sink)
    expect(typeof result).toBe('string');
    expect(result).toBe('x');
  });
});