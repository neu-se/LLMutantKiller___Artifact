import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function fragment handling", () => {
  it("should correctly handle URLs where fragment contains the entire remaining path", () => {
    const urlWithFragment = "http://example.com#/path/to/page";
    const result = parse(urlWithFragment);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/");
    expect(result?.path).toBe("/");
    expect(result?.search).toBeNull();
  });
});