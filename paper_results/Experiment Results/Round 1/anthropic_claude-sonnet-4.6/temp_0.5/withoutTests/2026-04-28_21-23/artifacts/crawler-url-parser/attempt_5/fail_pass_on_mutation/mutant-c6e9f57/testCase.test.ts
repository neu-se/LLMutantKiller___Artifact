import { parse, extract, gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("parse should return 2 results for two distinct URLs with different query params including utm", () => {
    const html = `<html><body>
      <a href="http://other.com/page?ref=home">Link 1</a>
      <a href="http://other.com/page?ref=nav">Link 2</a>
    </body></html>`;
    const results = extract(html, "http://example.com/");
    expect(results.length).toBe(2);
  });
});