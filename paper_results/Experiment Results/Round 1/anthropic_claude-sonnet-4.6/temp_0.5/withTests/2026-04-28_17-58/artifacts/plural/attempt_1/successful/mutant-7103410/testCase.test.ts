import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("monkeyPatch", () => {
  it("should add a working plural method to String.prototype that returns the pluralized string", () => {
    plural.monkeyPatch();
    const result = (String.prototype as any).plural.call("test");
    plural.unmonkeyPatch();
    expect(result).toBe("tests");
  });
});