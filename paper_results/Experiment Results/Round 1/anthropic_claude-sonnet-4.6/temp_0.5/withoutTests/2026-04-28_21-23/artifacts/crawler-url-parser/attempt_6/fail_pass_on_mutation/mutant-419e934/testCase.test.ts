import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype pageurl_path normalization", () => {
  it("correctly classifies uplevel when linkurl is index page parent of pageurl index page", () => {
    const linkurl = {
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: "/section/index.html"
    };
    const pageurl = {
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: "/section/sub/index.html"
    };
    // linkurl_path after normalization: /section/ (linkurl replace: /index.html -> /)
    // pageurl_path original: /section/sub/ (replace: /index.html -> /)
    // pageurl_path mutated: /section/sub (replace: /index.html -> "")
    // parts: linkurl=["section"](1), pageurl=["section","sub"](2), diff=-1
    // uplevel check: pageurl_path.includes("/section/")
    // original: "/section/sub/".includes("/section/") = true -> uplevel
    // mutated: "/section/sub".includes("/section/") = false -> internal
    expect(gettype(linkurl, pageurl)).toBe("uplevel");
  });
});