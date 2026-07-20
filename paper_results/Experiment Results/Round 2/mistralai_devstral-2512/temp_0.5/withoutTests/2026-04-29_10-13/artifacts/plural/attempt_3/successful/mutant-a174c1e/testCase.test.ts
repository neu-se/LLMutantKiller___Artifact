import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function behavior with num parameter", () => {
  it("should return singular form when num is 1 and plural form when num is not 1", () => {
    expect(plural("apple", 1)).toBe("apple");
    expect(plural("apple", 2)).toBe("apples");
    expect(plural("box", 1)).toBe("box");
    expect(plural("box", 3)).toBe("boxes");
  });
});