// test/parse-query-string-mutation.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function query string parsing', () => {
  it('should parse query string when parseQueryString is true and correctly calculate querycount', () => {
    const result = parse("http://example.com/path?q1=value1&q2=value2&q3=value3");
    expect(result.querycount).toBe(3);
    expect(result.search).toBe("?q1=value1&q2=value2&q3=value3");
  });
});