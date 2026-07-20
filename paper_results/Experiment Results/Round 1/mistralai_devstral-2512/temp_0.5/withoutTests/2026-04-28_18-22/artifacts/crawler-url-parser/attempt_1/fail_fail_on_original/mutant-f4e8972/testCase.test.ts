import { extract } from "./crawler-url-parser.js";

describe("extract function", () => {
  it("should handle non-string data input correctly", () => {
    const mockData = {
      html: () => "<html><body><a href='https://example.com'>Link</a></body></html>",
      find: (selector: string) => {
        if (selector === "base") {
          return { attr: () => undefined };
        } else if (selector === "a") {
          return {
            each: (callback: (i: number, el: any) => void) => {
              callback(0, {
                attribs: { href: "https://example.com" },
                children: [{ data: "Link" }]
              });
            }
          };
        }
        return { attr: () => undefined };
      }
    };

    const result = extract(mockData as any, "https://example.com");
    expect(result).toEqual([
      {
        url: "https://example.com",
        text: "Link",
        type: "samelevel"
      }
    ]);
  });
});