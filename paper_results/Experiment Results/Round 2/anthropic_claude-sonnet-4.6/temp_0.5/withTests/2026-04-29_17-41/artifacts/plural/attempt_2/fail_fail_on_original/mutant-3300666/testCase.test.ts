import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural with single character S", () => {
  it("should pluralize 'S' by appending 's' to get 'Ss'", () => {
    expect(plural("S")).toBe("Ss");
  });
});