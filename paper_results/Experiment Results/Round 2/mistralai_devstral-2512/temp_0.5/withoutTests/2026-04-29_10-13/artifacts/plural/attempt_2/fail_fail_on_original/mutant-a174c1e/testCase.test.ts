import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function behavior with num parameter", () => {
  it("should return singular form when num is 1", () => {
    expect(plural("apple", 1)).toBe("apple");
    expect(plural("box", 1)).toBe("box");
    expect(plural("child", 1)).toBe("child");
  });
});