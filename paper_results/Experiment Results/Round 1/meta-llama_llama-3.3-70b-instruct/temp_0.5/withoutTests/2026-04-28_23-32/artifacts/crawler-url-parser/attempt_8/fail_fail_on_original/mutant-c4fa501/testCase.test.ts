import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should remove directory index when parsing URL', () => {
    const url = "https://www.example.com/path/to/default.html";
    const parsedUrl = parse(url);
    if (parsedUrl!== null) {
      expect(parsedUrl.path).toBe('/path/to/');
    } else {
      expect(parsedUrl).not.toBeNull();
    }
  });
});