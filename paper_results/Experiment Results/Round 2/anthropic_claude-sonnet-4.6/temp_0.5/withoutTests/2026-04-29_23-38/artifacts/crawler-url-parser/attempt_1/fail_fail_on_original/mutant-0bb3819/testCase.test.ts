import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default path normalization", () => {
  it("should return 'uplevel' when linkurl is /default.html and pageurl has deeper path", () => {
    // linkurl_path = "/default.html" → original: "/" → parts=[], mutated: "" → parts=[]
    // pageurl_path = "/aaa/" → parts=["aaa"]
    // diff = 0-1 = -1, check pageurl_path.includes(linkurl_path)
    // original: "/aaa/".includes("/") = true → "uplevel"
    // mutated: "/aaa/".includes("") = true → "uplevel" - same!
    const result = gettype("http://example.com/default.html", "http://example.com/aaa/page.html");
    expect(result).toBe("uplevel");
  });
});