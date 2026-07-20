import pluralModule from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should correctly handle the plural function via monkeyPatch with num=1", () => {
    pluralModule.monkeyPatch();
    try {
      const result = ("cat" as any).plural(1);
      expect(result).toBe("cat");
    } finally {
      pluralModule.unmonkeyPatch();
    }
  });
});