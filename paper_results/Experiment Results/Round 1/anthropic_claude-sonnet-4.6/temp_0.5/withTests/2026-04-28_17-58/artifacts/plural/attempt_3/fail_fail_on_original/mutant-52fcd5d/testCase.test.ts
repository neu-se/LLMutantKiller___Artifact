import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural handles words ending in s correctly", () => {
  it("should pluralize 'dogs' to 'dogss' not leave it unchanged", () => {
    expect(plural("dogs")).toBe("dogss");
  });
});