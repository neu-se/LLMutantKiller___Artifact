// test/parse-query-string-mutation.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function query string parsing', () => {
  it('should parse query string and calculate querycount correctly', () => {
    const result = parse("http://example.com/path?q1=value1&q2=value2");
    expect(result.search).toBe("?q1=value1&q2=value2");
    expect(result.querycount).toBe(2);
  });
});