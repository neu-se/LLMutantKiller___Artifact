import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function text trimming', () => {
  it('should trim whitespace from link text when extracting URLs', () => {
    const html = `<html><body><a href="http://www.example.com/page">  Hello World  </a></body></html>`;
    const result = extract(html, "http://www.example.com/");
    
    const link = result.find((el: any) => el.url === "http://www.example.com/page");
    expect(link).toBeDefined();
    expect(link!.text).toBe("Hello World");
  });
});