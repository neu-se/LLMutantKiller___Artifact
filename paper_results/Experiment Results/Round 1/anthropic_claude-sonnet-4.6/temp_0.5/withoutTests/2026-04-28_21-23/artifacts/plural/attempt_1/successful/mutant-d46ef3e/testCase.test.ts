import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should pluralize 'taxi' as 'taxis' not 'taxies' (word contains x but does not end in x)", () => {
    expect(plural("taxi")).toBe("taxis");
  });
});