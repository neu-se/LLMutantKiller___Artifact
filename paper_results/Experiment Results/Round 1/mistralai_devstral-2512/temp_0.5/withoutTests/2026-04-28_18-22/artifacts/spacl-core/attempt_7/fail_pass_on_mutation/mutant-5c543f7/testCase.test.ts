import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher", () => {
  it("should correctly handle path specifications with property names containing exactly two characters", () => {
    const matcher = new Matcher("/:ab");
    expect(matcher.props).toEqual(["ab"]);
    expect("/value").toMatch(matcher);
  });
});