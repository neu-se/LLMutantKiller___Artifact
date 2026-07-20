import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract with www base URL', () => {
  it('should correctly handle www in base URL for link type classification', () => {
    const html = `<html><body>
      <a href="http://www.example.com/aaa/bbb">link1</a>
      <a href="http://sub.example.com/aaa/bbb">link2</a>
    </body></html>`;
    
    const result = extract(html, "http://www.example.com/");
    const link2 = result.find((r: any) => r.url === "http://sub.example.com/aaa/bbb");
    expect(link2).toBeDefined();
    // www.example.com vs sub.example.com - same domain, different subdomains
    // With stripWWW:true: page subdomain=null(0), link subdomain="sub"(3) -> "subdomain"
    // With stripWWW:false: page subdomain="www"(3), link subdomain="sub"(3) -> "subdomain"  
    expect(link2!.type).toBe("subdomain");
  });
});