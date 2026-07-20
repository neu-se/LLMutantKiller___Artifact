import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize 'folio' with 's' instead of 'es'", () => {
    expect(plural("folio", 2)).toBe("folios");
  });
});