import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser gettype with directory index", () => {
  it("should treat /index.html as same level as /", () => {
    const result = gettype("http://www.example.com/index.html", "http://www.example.com/");
    expect(result).toBe("samelevel");
  });
});