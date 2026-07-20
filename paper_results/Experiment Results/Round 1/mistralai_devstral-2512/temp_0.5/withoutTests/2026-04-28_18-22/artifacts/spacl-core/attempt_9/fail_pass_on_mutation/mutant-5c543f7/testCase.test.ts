import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher", () => {
  it("should correctly handle path specifications with property names containing only a colon and dot", () => {
    expect(() => new Matcher("/:.")).not.toThrow();
    const matcher = new Matcher("/:.");
    expect(matcher.props).toEqual(["."]);
    expect("/value").toMatch(matcher);
  });
});