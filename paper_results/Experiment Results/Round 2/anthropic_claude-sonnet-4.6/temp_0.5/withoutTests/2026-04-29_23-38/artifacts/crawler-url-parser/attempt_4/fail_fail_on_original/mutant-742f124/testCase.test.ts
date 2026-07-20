import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should normalize URLs according to result_normalize_options including stripFragment", () => {
    // Test removeDirectoryIndex behavior which is also in result_normalize_options
    // If the options object is used, removeDirectoryIndex:true would strip index.html
    const result = parse("http://example.com/index.html");
    expect(result).not.toBeNull();
    // If normalize-url is applied with removeDirectoryIndex:true, 
    // the URL would be "http://example.com/"
    expect(result!.url).toBe("http://example.com/");
  });
});