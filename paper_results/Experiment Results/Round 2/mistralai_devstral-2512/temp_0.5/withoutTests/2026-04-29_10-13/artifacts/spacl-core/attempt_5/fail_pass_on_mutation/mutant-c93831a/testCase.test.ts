import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher path matching with trailing slash", () => {
  it("should handle empty string path correctly", () => {
    const matcher = Matcher.for("/test/*");
    const result = matcher[Symbol.match]("");
    expect(result).toBeNull();
  });
});