import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract text null handling', () => {
  it('should set text to empty string when anchor text is null', () => {
    const href = 'http://www.example.com/page';
    
    const elWrapper = {
      attr: (name: string) => name === 'href' ? href : undefined,
      text: () => null as any,
      trim: () => null as any,
    };
    
    // The code does: let text = $(this).text().trim()
    // So $(this) must return something with .text() that returns something with .trim()
    // null.trim() would throw... so text() must return something with trim()
    // that returns null
    
    const textResult = { trim: () => null as any };
    
    const innerEl = {
      attr: (name: string) => name === 'href' ? href : undefined,
      text: () => textResult,
    };
    
    const fake$ = (selector: any) => {
      if (selector === 'base') return { attr: () => undefined };
      if (selector === 'a') return {
        each: (fn: Function) => fn(0, {}),
      };
      // $(this) call
      return innerEl;
    };
    
    const result = extract(fake$, 'http://www.example.com/');
    const link = result.find((el: any) => el.url === 'http://www.example.com/page');
    expect(link).toBeDefined();
    expect(link.text).toBe('');
  });
});