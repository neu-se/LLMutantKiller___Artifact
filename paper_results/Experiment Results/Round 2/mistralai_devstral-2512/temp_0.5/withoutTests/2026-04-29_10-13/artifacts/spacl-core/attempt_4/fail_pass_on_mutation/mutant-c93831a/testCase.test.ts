import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher path matching with trailing slash", () => {
  it("should return null for paths ending with slash when spec doesn't allow it", () => {
    const matcher = Matcher.for("/test");
    const result = matcher[Symbol.match]("/test/");
    expect(result).toBeNull();
  });
});