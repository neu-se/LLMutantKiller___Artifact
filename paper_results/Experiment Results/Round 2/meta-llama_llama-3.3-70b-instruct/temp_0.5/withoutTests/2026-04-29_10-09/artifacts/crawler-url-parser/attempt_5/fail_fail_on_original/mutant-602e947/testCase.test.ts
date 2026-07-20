import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly handle url parsing with localhost', () => {
    const url = "://localhost";
    const resultOriginal = parse(url);
    expect(resultOriginal).toBeNull();
  });
});