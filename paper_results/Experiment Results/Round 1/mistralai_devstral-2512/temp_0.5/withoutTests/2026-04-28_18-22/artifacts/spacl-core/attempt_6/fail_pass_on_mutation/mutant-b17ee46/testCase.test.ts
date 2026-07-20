import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher version parameter default value", () => {
  it("should use '1.1' as default version when parameter is not provided", () => {
    const matcher = Matcher.for("/test");
    expect(matcher.spec).toBe("/test");
    expect(matcher).toBeInstanceOf(Matcher);
  });
});