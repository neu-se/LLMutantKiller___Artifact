import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should not apply man/woman rule to words that merely start with 'man' (e.g., 'manual')", () => {
    // The original regex /^(?:wo)?man$/i uses $ anchor, so 'manual' should NOT match
    // The mutated regex /^(?:wo)?man/i lacks $ anchor, so 'manual' WOULD match and become 'menual'
    expect(plural("manual")).toBe("manuals");
  });
});