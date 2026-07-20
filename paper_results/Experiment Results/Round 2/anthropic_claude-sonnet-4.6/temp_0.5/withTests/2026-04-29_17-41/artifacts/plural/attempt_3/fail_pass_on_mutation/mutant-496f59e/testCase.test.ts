import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should pluralize cherry to cherries using the consonant-y rule", () => {
    expect(plural("cherry")).toBe("cherries");
  });
});