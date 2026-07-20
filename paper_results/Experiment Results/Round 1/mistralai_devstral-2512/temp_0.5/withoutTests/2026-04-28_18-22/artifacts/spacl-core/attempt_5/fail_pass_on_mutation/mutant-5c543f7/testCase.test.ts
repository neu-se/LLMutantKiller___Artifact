import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher", () => {
  it("should correctly handle path specifications with property names containing special characters", () => {
    const matcher = new Matcher("/:a.b");
    expect(matcher.props).toEqual(["a.b"]);
    expect("/value").toMatch(matcher);
  });
});