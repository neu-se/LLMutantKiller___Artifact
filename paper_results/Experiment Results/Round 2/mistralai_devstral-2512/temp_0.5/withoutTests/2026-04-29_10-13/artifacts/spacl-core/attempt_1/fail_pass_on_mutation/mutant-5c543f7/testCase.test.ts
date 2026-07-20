import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe("Matcher path specification validation", () => {
  it("should accept path with property capture followed by additional characters", () => {
    const spec = "/:prop1extra";
    expect(() => new Matcher(spec)).not.toThrow();
    const matcher = new Matcher(spec);
    expect(matcher.spec).toBe(spec);
    expect(matcher.props).toEqual(["prop1extra"]);
  });
});