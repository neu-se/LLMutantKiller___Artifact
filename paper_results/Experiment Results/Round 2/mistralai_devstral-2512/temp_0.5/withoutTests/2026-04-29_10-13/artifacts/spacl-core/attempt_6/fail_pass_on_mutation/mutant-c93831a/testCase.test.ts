import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher path matching with trailing slash", () => {
  it("should handle single slash path correctly", () => {
    const matcher = Matcher.for("/");
    const result = matcher[Symbol.match]("/");
    expect(result).not.toBeNull();
  });
});