const plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe('plural', () => {
  it('should only apply string-key rules when the key is actually a string type', () => {
    const regexKey = /^__mutation_test_unique__$/;
    plural.addRule(regexKey, () => 'mutation_detected');
    
    // Pass the regex object itself as word
    // RegExp branch: regexKey.test(regexKey) tests regexKey.toString() which is '/^__mutation_test_unique__$/'
    // This doesn't match /^__mutation_test_unique__$/ (has slashes), so RegExp branch skipped
    // Original String branch: type(regexKey) === 'String' → false → skip → returns regexKey + 's'
    // Mutated String branch: true && regexKey === regexKey → true → returns 'mutation_detected'
    
    const result = plural(regexKey);
    expect(result).not.toBe('mutation_detected');
  });
});