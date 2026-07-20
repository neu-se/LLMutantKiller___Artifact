import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher version parameter validation", () => {
  it("should accept valid version '1.1' explicitly", () => {
    const matcher = Matcher.for("/test", "1.1");
    expect(matcher.spec).toBe("/test");
    expect(matcher).toBeInstanceOf(Matcher);
  });
});