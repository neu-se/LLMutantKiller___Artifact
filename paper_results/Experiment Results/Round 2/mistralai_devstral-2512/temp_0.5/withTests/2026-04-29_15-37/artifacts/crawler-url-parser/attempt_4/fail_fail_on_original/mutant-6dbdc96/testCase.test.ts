import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with href length validation", () => {
  it("should include links with href length exactly 2 when no baseUrl is provided", () => {
    const html = `
      <html>
        <body>
          <a href="ab">two chars</a>
          <a href="abc">three chars</a>
        </body>
      </html>
    `;
    const result = extract(html);
    
    const twoCharLink = result.find((item) => item.text === "two chars");
    const threeCharLink = result.find((item) => item.text === "three chars");
    
    expect(twoCharLink).toBeDefined();
    expect(twoCharLink?.url).toBe("http://ab/");
    expect(threeCharLink).toBeDefined();
    expect(threeCharLink?.url).toBe("http://abc/");
  });
});