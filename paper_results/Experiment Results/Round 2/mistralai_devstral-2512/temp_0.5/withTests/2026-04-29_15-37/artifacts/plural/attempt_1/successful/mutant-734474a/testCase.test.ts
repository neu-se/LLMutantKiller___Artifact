import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function behavior", () => {
  it("should correctly pluralize 'bacterium' to 'bacteria'", () => {
    expect(plural("bacterium")).toBe("bacteria");
  });
});