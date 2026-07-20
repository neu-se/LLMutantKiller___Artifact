import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle non-string data input by using it directly as cheerio object", () => {
    const mockCheerioObject = {
      find: (selector: string) => {
        if (selector === 'base') {
          return { attr: () => undefined };
        }
        if (selector === 'a') {
          return {
            each: (callback: (index: number, element: any) => void) => {
              callback(0, {
                attribs: {
                  href: 'https://example.com/test'
                },
                children: [{
                  data: 'Test Link'
                }]
              });
            }
          };
        }
        return { attr: () => undefined };
      }
    };

    // This test will pass on original code (where non-string data is used directly)
    // but fail on mutated code (where cheerio.load() is always called on non-string data)
    const result = extract(mockCheerioObject, "https://example.com");
    expect(result).toEqual([{
      url: "https://example.com/test",
      text: "Test Link",
      type: "sublevel"
    }]);
  });
});