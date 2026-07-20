import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher property capture validation", () => {
  it("should accept property capture with dot followed by characters", () => {
    const spec = "/:a.";
    const matcher = new Matcher(spec);
    expect(matcher.props).toEqual(["a."]);
  });
});