import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with stripWWW option", () => {
  it("should normalize URLs by stripping 'www.' prefix from host", () => {
    const urlWithWWW = "http://www.example.com/path";
    const urlWithoutWWW = "http://example.com/path";
    const resultWithWWW = parse(urlWithWWW);
    const resultWithoutWWW = parse(urlWithoutWWW);
    expect(resultWithWWW?.host).toBe(resultWithoutWWW?.host);
    expect(resultWithWWW?.url).toBe(resultWithoutWWW?.url);
  });
});