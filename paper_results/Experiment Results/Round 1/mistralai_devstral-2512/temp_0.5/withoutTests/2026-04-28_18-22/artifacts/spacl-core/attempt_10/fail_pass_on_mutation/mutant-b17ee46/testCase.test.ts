import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher version parameter default value", () => {
  it("should accept wildcard patterns that are valid in version 1.1", () => {
    // This pattern should work with version 1.1 but might fail with empty string version
    expect(() => {
      Matcher.for("/test/**/path");
    }).not.toThrow();
  });
});