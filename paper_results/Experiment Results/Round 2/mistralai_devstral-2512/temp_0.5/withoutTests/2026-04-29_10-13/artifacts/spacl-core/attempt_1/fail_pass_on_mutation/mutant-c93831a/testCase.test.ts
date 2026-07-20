import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe("Matcher path matching with trailing slash", () => {
  it("should return null for paths ending with a single slash", () => {
    const matcher = Matcher.for("/test");
    const result = matcher[Symbol.match]("/test/");
    expect(result).toBeNull();
  });
});