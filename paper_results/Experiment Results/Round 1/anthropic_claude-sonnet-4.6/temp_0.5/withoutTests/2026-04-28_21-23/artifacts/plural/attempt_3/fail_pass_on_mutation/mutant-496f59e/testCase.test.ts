import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("detects mutation by using addRule with a string key and verifying non-matching words are unaffected", () => {
    // Add a string rule - it gets unshifted to front
    plural.addRule('testword', 'testwords');
    // 'otherword' should NOT match 'testword' string rule
    // Original: type(rule[0]) === 'RegExp' is false for string rule, skips to second if
    //           'testword' !== 'otherword', continues to return 'otherwords'
    // Mutated: true, enters first branch, type(rule[1]) === 'Function' is false,
    //          returns 'testwords' for ANY word!
    expect(plural("otherword")).toBe("otherwords");
  });
});