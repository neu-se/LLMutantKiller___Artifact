import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher optional segment behavior", () => {
  it("should correctly handle paths with optional segments when min=0 and opt=true in version 1", () => {
    const matcher = new Matcher("/a/*/b", "1");
    expect(matcher.test("/a/b")).toBe(true);
    expect(matcher.test("/a/x/b")).toBe(true);
  });
});