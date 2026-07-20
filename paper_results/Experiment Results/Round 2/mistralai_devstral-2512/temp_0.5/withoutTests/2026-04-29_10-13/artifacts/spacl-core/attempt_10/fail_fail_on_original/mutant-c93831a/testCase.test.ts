import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher path matching with trailing slash", () => {
  it("should handle path with trailing slash when string length is greater than 1 and ends with slash", () => {
    const matcher = Matcher.for("/test/*");
    const result = matcher[Symbol.match]("/test/value/");
    expect(result).not.toBeNull();
  });
});