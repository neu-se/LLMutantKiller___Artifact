import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher path matching with trailing slash", () => {
  it("should handle path with trailing slash when string length is exactly 1", () => {
    const matcher = Matcher.for("/a");
    const result = matcher[Symbol.match]("/");
    expect(result).toBeNull();
  });
});