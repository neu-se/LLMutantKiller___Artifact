import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - zero should become zeroes", () => {
  it("should pluralize 'zero' as 'zeroes' not 'zeros'", () => {
    expect(plural("zero")).toBe("zeroes");
  });
});