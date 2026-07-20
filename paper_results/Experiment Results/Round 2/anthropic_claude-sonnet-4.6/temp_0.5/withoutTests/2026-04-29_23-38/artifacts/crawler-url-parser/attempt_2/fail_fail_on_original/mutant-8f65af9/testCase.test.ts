import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract", () => {
  it("should set text to empty string when text is null", () => {
    // Create a fake cheerio-like object
    const fakeCheerio: any = function(selector: string) {
      if (selector === 'base') {
        return { attr: () => undefined, each: () => {} };
      }
      if (selector === 'a') {
        const elements = [{href: 'http://example.com/page', text: null}];
        return {
          each: (fn: Function) => {
            elements.forEach((el, i) => {
              const elWrapper = {
                attr: (name: string) => name === 'href' ? el.href : undefined,
                text: () => el.text
              };
              fn.call(elWrapper, i, el);
            });
          }
        };
      }
      return { each: () => {}, attr: () => undefined };
    };
    
    const results = extract(fakeCheerio, 'http://www.test.com/');
    expect(results[0].text).toBe("");
    expect(results[0].text).not.toBeNull();
  });
});