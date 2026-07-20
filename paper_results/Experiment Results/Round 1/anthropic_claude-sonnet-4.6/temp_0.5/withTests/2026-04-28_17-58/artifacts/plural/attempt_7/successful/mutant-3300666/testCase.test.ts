import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural rules array initialization", () => {
  it("should initialize rules as an empty array before any addRule calls", () => {
    let initialRulesLength = -1;
    const originalUnshift = Array.prototype.unshift;
    // Spy on unshift to capture the length of rules before the first addRule call
    Array.prototype.unshift = function(this: any[], ...args: any[]) {
      if (initialRulesLength === -1) {
        initialRulesLength = this.length;
      }
      return originalUnshift.apply(this, args);
    };
    jest.resetModules();
    require("../../../../../../../../../../../subject_repositories/plural/index.js");
    Array.prototype.unshift = originalUnshift;
    // In original: rules = [], so first unshift sees length 0
    // In mutant: rules = ["Stryker was here"], so first unshift sees length 1
    expect(initialRulesLength).toBe(0);
  });
});