import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher path matching with trailing slash", () => {
  it("should handle path with trailing slash when string length is exactly 2", () => {
    const matcher = Matcher.for("/a");
    const result = matcher[Symbol.match]("/a/");
    expect(result).toBeNull();
  });
});