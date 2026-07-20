import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher version parameter validation", () => {
  it("should throw an error when version is an empty string", () => {
    expect(() => {
      Matcher.for("/test", "" as any);
    }).toThrow("Path contains malformed wildcards");
  });
});