import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should not match rule when key is non-String type even if it equals the word', () => {
    const pluralModule = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    pluralModule.addRule(42, 'forty-twos');
    const result = pluralModule(42);
    // Original: type(42) === 'String' -> false -> no match -> 42 + 's' = '42s'
    // Mutated: true && 42 === 42 -> true -> returns 'forty-twos'
    expect(result).toBe('42s');
  });
});