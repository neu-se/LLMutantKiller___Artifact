import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly parse host from a URL resolved against a base with four-slash path", () => {
    const result = parse("page", "////example.com/");
    expect(result).not.toBeNull();
    expect(result!.host).toBe("");
  });
});