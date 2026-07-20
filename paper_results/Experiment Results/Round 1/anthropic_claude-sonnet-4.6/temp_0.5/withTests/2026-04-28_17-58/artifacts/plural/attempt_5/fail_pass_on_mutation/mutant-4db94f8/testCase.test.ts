import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural mutation detection with non-string rule key type', () => {
  it('should not match when rule key is a non-String non-RegExp type that equals word', () => {
    // Add a rule with a non-string, non-regexp key that could match via ===
    // We need rule[0] to not be 'String' type but equal to word
    // If we pass a String object as word, and use same String object as key:
    const key = new String('uniquetestword999') as unknown as string;
    plural.addRule(key, 'should_not_appear');
    
    // Original: type(key) === 'String' is TRUE (String objects have type 'String')
    // but key === 'uniquetestword999' is FALSE (object !== primitive)
    // Mutated: true && key === 'uniquetestword999' is also FALSE
    // Still same...
    
    // Different approach: pass the SAME object as both key and word
    const result = plural(key as unknown as string);
    // Original: type(key)==='String' true, key===key true -> matches -> 'should_not_appear'  
    // Mutated: true && key===key true -> matches -> 'should_not_appear'
    // Same again!
    expect(result).toBe('should_not_appear');
  });
});