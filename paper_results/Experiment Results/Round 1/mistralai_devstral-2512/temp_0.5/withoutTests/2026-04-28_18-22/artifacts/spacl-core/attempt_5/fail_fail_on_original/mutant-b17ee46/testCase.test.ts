import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher version parameter type checking", () => {
  it("should reject invalid version parameter type", () => {
    expect(() => {
      Matcher.for("/test", "" as any);
    }).toThrow();
  });
});