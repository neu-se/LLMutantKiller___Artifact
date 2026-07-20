import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural rules initialization", () => {
  it("should pluralize 'aardvark' to 'aardvarks'", () => {
    expect(plural("aardvark")).toBe("aardvarks");
  });
});