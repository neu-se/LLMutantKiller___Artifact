import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract", () => {
  it("should set text to empty string when anchor text trims to null", () => {
    const element = { type: 'tag', name: 'a' };
    
    const fakeCheerio: any = function(selector: any) {
      if (selector === 'base') {
        return { attr: () => undefined };
      }
      if (selector === 'a') {
        return {
          each: (fn: Function) => {
            fn.call(element, 0, element);
          }
        };
      }
      if (selector === element) {
        return {
          attr: (name: string) => name === 'href' ? 'http://example.com/page' : undefined,
          text: () => ({ trim: () => null })
        };
      }
      return { each: () => {}, attr: () => undefined };
    };
    
    const results = extract(fakeCheerio, 'http://www.test.com/');
    expect(results).toHaveLength(1);
    expect(results[0].text).toBe("");
  });
});