import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should pluralize words containing 'x' not at the end correctly, without adding 'es' incorrectly", () => {
    // The original rule is /x$|ch$|s$/i which only matches words ENDING in x
    // The mutated rule is /x|ch$|s$/i which matches words CONTAINING x anywhere
    // A word like "taxi" contains 'x' but doesn't end in 'x'
    // Original: no match on this rule → falls through → "taxis"
    // Mutated: matches /x|.../ → returns "taxi" + "es" = "taxies"
    expect(plural("taxi")).toBe("taxis");
  });
});