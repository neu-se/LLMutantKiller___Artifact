import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher wildcard validation", () => {
  it("should reject paths with '+' followed by slash in version 1.1", () => {
    expect(() => {
      new Matcher("/test+/path", '1.1');
    }).toThrow("Path contains malformed wildcards");
  });
});