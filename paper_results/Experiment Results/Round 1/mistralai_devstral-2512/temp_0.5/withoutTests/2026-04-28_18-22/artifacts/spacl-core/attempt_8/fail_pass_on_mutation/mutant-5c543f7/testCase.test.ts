import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher", () => {
  it("should correctly handle path specifications with property names shorter than 2 characters", () => {
    const matcher = new Matcher("/:a");
    expect(matcher.props).toEqual(["a"]);
    expect("/value").toMatch(matcher);
  });
});