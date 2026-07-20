import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should return word unchanged when num is 1, even for words with special plural rules", () => {
    // num=1 means singular - word returned as-is
    // This tests the false branch: num !== 1 is false, so condition is false
    expect(plural("goose", 1)).toBe("goose")
    expect(plural("mouse", 1)).toBe("mouse")  
    expect(plural("person", 1)).toBe("person")
    expect(plural("die", 1)).toBe("die")
    // num=0 should pluralize
    expect(plural("goose", 0)).toBe("geese")
    expect(plural("mouse", 0)).toBe("mice")
    expect(plural("person", 0)).toBe("people")
  })
})