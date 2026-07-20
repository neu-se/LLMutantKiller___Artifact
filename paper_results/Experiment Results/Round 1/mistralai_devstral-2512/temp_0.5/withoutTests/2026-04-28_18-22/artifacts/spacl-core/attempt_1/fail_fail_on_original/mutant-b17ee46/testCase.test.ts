import { Matcher } from "../src/matcher";

describe("Matcher static constructor", () => {
  it("should use version '1.1' as default when no version is specified", () => {
    const matcher = Matcher.for("/test");
    expect(matcher.spec).toBe("/test");
    expect(matcher).toBeInstanceOf(Matcher);
  });
});