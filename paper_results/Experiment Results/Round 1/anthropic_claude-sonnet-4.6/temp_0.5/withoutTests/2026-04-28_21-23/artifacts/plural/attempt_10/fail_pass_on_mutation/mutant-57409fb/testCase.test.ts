import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should pluralize a word when num is explicitly passed as undefined", () => {
    // Original: undefined !== 1 (true) || undefined === undefined (true) => true => pluralize
    // Mutated:  undefined !== 1 (true) || false => true => pluralize
    // Both should return plural... but testing anyway
    const result = plural("cat", undefined);
    expect(result).toBe("cats");
    // Also test that num=1 returns singular
    expect(plural("cat", 1)).toBe("cat");
    // And num=2 returns plural  
    expect(plural("cat", 2)).toBe("cats");
  });
});