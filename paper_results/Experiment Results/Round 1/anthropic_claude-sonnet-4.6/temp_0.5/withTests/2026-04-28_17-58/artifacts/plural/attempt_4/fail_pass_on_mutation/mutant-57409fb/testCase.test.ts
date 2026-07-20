import { default as plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should return word unchanged when called with num equal to 1', () => {
    // When num is 1, word should be returned as-is (singular)
    // The mutation changes || num === undefined to || false
    // which only differs when num !== 1 is false but num === undefined is true
    // Testing with explicit undefined to ensure the condition handles it
    const result = plural('test', 1 as any);
    expect(result).toBe('test');
    
    // Now test that plural('test', undefined) still pluralizes
    const result2 = plural('test', undefined as any);
    expect(result2).toBe('tests');
  });
});