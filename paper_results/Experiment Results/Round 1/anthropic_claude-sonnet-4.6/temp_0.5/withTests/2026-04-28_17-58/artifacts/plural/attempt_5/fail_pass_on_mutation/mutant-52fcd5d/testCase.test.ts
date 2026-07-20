import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural handles 'tropic' word correctly", () => {
  it("should pluralize 'tropic' to 'tropics'", () => {
    expect(plural("tropic")).toBe("tropics");
  });
});