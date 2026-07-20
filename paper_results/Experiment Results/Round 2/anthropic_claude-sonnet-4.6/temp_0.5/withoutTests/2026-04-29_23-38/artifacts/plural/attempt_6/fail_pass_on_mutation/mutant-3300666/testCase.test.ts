import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should correctly pluralize without extra string entries in rules interfering", () => {
    // In mutated version, rules = ["Stryker was here"] initially
    // After all addRule(unshift) calls, "Stryker was here" is at the end
    // rule[0]='S', rule[1]='t'
    // For word='S': s$ rule matches first -> 'Ses'
    // The bad entry is only reachable if no earlier rule matches AND word='S'
    // Since s$ always matches 'S', the bad entry is unreachable
    //
    // However, what if we test with a word that somehow bypasses all rules
    // and reaches the bad entry? The only such word is 'S' (uppercase, case-sensitive)
    // But 'S' is caught by s$ (case-insensitive)
    //
    // Let me try: what if the word is 'S' but we check the result is 'Ses' not 't'?
    expect(plural('S')).toBe('Ses')
  })
})