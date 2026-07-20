import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe("gettype with index page paths", () => {
  it("should correctly identify samelevel when pageurl has /index.html suffix", () => {
    // The mutation changes /\/index\.[a-z]+$/ to /\/index\.[^a-z]+$/
    // This means the mutated code will NOT strip /index.html from pageurl_path
    // because 'h' in 'html' matches [a-z] but NOT [^a-z]
    // So with the mutation, pageurl_path stays as "/index.html" instead of "/"
    // This causes the type comparison to fail
    
    const linkurl = "http://www.example.com/";
    const pageurl = "http://www.example.com/index.html";
    
    // In original: pageurl_path "/index.html" -> "/" (after replace), linkurl_path "/" 
    // Both become "/", so they should be "samelevel"
    // In mutated: pageurl_path stays "/index.html", linkurl_path is "/"
    // They won't match as samelevel
    
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});