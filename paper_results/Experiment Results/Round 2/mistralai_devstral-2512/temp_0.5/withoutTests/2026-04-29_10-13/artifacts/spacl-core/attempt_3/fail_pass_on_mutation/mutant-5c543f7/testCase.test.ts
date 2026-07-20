import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher path specification validation", () => {
  it("should accept path with property capture containing a dot followed by characters", () => {
    const spec = "/:prop.name";
    const matcher = new Matcher(spec);
    expect(matcher.spec).toBe(spec);
    expect(matcher.props).toContain("prop.name");
  });
});