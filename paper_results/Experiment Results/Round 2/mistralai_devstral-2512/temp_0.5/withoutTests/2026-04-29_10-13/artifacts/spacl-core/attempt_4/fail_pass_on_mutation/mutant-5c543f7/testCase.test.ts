import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher path specification validation", () => {
  it("should correctly handle property capture with just a dot", () => {
    const spec = "/:.";
    const matcher = new Matcher(spec);
    expect(matcher.props).toEqual(["."]);
  });
});