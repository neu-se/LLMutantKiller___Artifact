import { plural, addRule } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function behavior with regex rule", () => {
  it("should correctly apply regex-based pluralization rules", () => {
    // Test a word that matches a regex rule (ends with 'y' after consonant)
    const result = plural("cherry");
    expect(result).toBe("cherries");
  });
});