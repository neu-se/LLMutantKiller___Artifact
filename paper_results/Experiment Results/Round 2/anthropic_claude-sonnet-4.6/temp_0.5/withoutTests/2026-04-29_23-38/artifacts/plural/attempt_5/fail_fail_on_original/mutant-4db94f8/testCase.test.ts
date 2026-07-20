import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should handle regex key equality correctly', () => {
    const pluralModule = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    // Use the exact same regex object that was added as a rule
    // We need access to an existing rule's regex object
    // Let's add our own and use the same reference
    const myRegex = /testunique999/;
    pluralModule.addRule(myRegex, 'specialresult');
    
    // Now call plural with myRegex as the word
    // myRegex.test(myRegex): /testunique999/.test("/testunique999/") -> false (string rep doesn't match)
    // Original: type(myRegex) === 'String' -> false -> skip
    // Mutated: true && myRegex === myRegex -> TRUE -> returns 'specialresult'
    
    const result = pluralModule(myRegex);
    // Original returns: String(myRegex) + 's' = '/testunique999/s'
    // Mutated returns: 'specialresult'
    expect(result).not.toBe('specialresult');
  });
});