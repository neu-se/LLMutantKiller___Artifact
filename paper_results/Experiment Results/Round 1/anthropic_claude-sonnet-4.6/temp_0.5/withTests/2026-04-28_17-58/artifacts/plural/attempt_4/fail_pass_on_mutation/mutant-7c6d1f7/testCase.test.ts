import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - consonant-o words get -es suffix", () => {
  it("should pluralize 'zero' as 'zeroes'", () => {
    expect(plural("zero")).toBe("zeroes");
  });
});