import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe("Matcher wildcard validation", () => {
  it("should reject paths with malformed wildcards when followed by a slash in version 1.1", () => {
    expect(() => {
      new Matcher("/test+/", '1.1');
    }).toThrow("Path contains malformed wildcards");
  });
});