import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural string rule matching", () => {
  it("should pluralize 'person' to 'people' not 'chillies'", () => {
    expect(plural("person")).toBe("people");
  });
});