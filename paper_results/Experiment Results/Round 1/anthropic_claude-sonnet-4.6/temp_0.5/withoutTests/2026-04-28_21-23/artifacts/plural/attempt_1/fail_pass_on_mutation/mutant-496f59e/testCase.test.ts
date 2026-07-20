import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should correctly pluralize words with string rules without being affected by unrelated string rules", () => {
    // In the mutated code, type(rule[0]) === 'RegExp' is replaced with true,
    // meaning string rules will always match any word, returning wrong results
    // 'criterion' should return 'criteria', but mutated code returns 'chillies'
    // because 'chilli' rule (added last, so first in array after regex rules) 
    // will match with condition=true
    expect(plural("criterion")).toBe("criteria");
  });
});