import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle non-string data input correctly", () => {
    const mockData = {
      html: () => "<a href='https://example.com'>Example</a>",
      find: (selector: string) => {
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
        return {
          attr: () => undefined
        };
      }
    };

    const result = extract(mockData, "https://example.com");
    expect(result).toEqual([{
      url: "https://example.com",
      text: "Example",
      type: "samelevel"
    }]);
  });
});