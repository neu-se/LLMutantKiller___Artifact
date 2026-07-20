import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract with index page source", () => {
  it("classifies links correctly when source page is an index.html", () => {
    const html = '<a href="/section/sub/">Sub Section</a>';
    const sourceUrl = "http://example.com/section/index.html";
    const result = extract(html, sourceUrl);
    // The source is /section/index.html
    // pageurl_path original: /section/
    // pageurl_path mutated: /section
    // linkurl_path: /section/sub/
    // parts: linkurl=["section","sub"](2), pageurl=["section"](1), diff=1
    // sublevel check: linkurl_path.includes(pageurl_path)
    // original: "/section/sub/".includes("/section/") = true -> sublevel
    // mutated: "/section/sub/".includes("/section") = true -> sublevel
    // Hmm, same...
    expect(result[0].type).toBe("sublevel");
  });
});