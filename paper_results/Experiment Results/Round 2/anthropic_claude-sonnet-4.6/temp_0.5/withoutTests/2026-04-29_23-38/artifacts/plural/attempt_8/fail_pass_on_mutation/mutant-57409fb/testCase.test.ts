import pluralModule from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize via monkeyPatch when no num is provided", () => {
    pluralModule.monkeyPatch()
    try {
      const result = ("cat" as any).plural()
      expect(result).toBe("cats")
    } finally {
      pluralModule.unmonkeyPatch()
    }
  })
})