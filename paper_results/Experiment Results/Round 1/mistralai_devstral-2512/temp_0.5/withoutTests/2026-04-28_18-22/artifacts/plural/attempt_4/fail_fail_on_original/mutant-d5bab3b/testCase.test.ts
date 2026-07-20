import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize 'woman' to 'women' and not match partial words", () => {
    expect(plural("woman")).toBe("women");
    expect(plural("superwoman")).toBe("superwomen");
  });
});