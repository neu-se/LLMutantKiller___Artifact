import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher optional segment behavior", () => {
  it("should match paths with optional segments correctly", () => {
    const matcher = new Matcher("/a/*/b", "1");
    expect(matcher.test("/a/b")).toBe(true);
  });
});