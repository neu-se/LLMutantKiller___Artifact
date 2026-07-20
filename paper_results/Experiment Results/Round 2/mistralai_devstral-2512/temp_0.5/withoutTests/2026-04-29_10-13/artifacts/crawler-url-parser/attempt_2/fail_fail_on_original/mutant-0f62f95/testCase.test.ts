import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should return null for invalid URLs when module is not the main module", () => {
    const result = parse("invalid-url");
    expect(result).toBeNull();
  });
});