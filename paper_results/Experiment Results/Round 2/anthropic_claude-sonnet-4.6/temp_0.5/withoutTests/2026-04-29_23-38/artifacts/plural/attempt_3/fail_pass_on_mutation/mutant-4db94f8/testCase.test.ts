import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('handles word matching regex rule where rule[1] is a string - addRule with regex and string result', () => {
    const { addRule } = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    // Add a rule with a RegExp key and string value
    addRule(/^testword$/, 'testwords');
    // In mutated code, after RegExp matches and returns, we're fine
    // But if RegExp doesn't match, the String check with 'true' might call rule[1] as function on a string
    expect(plural('testword')).toBe('testwords');
  });
});