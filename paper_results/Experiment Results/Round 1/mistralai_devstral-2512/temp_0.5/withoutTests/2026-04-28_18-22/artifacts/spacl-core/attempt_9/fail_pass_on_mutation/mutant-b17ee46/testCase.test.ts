import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher version parameter", () => {
  it("should use '1.1' as default when version parameter is omitted", () => {
    const matcher = Matcher.for("/test");
    expect(matcher.spec).toBe("/test");
    expect(matcher).toBeInstanceOf(Matcher);
  });
});