import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural rules initialization", () => {
  it("should pluralize words correctly without interference from initial rules array state", () => {
    // In mutated code, rules starts as ["Stryker was here"]
    // This string ends up at the end of rules array
    // For word 'S': s$ rule matches first, returns 'Ses'  
    // The stryker entry (rule[0]='S', rule[1]='t') is only reachable if no prior rule matches
    // Test a word where the stryker entry would be the only match
    // 'S' always matches s$ first, so we need to verify the s$ rule behavior
    expect(plural("bus")).toBe("buses");
    expect(plural("gas")).toBe("gases");
  });
});