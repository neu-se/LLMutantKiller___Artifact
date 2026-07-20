import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher version parameter type checking", () => {
  it("should throw TypeError when version parameter is not a valid version string", () => {
    expect(() => {
      Matcher.for("/test", "" as any);
    }).toThrow(TypeError);
  });
});