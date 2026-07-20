import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe("Matcher property capture validation", () => {
  it("should reject property capture with just a dot character", () => {
    const spec = "/:.";
    expect(() => new Matcher(spec)).toThrow("Path contains malformed captures");
  });
});