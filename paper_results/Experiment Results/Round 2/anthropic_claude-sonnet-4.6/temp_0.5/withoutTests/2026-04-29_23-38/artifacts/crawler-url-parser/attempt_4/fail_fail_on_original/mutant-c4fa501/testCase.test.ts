import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should return samelevel for default.html compared to directory", () => {
    const result = gettype("http://www.example.com/section/default.html", "http://www.example.com/section/page.html");
    expect(result).toBe("samelevel");
  });
});