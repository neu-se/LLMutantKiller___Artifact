import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher default version parameter", () => {
  it("should accept version '1.1' as default when no version is provided", () => {
    const matcher = Matcher.for("/test");
    expect(matcher.spec).toBe("/test");
    expect(matcher).toBeInstanceOf(Matcher);
  });
});