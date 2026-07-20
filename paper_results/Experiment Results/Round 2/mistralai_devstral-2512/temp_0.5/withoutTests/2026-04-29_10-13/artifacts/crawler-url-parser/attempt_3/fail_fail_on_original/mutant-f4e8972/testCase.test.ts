import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle non-string data input by treating it as cheerio object", () => {
    const mockCheerioObject = {
      html: () => "<a href='https://example.com'>Example</a>",
      find: (selector: string) => {
        if (selector === 'base') {
          return { attr: () => undefined };
        }
        if (selector === 'a') {
          return {
            each: (callback: (index: number, element: any) => void) => {
              callback(0, {
                attribs: {
                  href: 'https://example.com'
                },
                children: [{
                  data: 'Example'
                }]
              });
            }
          };
        }
        return { attr: () => undefined };
      }
    };

    const result = extract(mockCheerioObject, "https://example.com");
    expect(result).toEqual([{
      url: "https://example.com",
      text: "Example",
      type: "samelevel"
    }]);
  });
});