import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe("Matcher path matching with trailing slash", () => {
  it("should handle paths ending with slash correctly", () => {
    const matcher = Matcher.for("/test/*");
    const result = matcher[Symbol.match]("/test/value/");
    expect(result).not.toBeNull();
  });
});