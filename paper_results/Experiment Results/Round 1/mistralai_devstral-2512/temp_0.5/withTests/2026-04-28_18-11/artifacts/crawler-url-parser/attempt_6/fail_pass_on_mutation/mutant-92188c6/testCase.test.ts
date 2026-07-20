// test/parse-query-string-mutation.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function query string parsing', () => {
  it('should correctly calculate querycount when parseQueryString is true', () => {
    const result = parse("http://example.com/path?q1=value1&q2=value2&q3=value3");
    expect(result.querycount).toBe(3);
  });
});