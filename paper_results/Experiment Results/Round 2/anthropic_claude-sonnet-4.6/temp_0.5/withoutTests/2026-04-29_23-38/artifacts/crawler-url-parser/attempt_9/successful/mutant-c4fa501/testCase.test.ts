import * as fs from 'fs';
import * as path from 'path';

describe("crawler-url-parser", () => {
  it("should have removeDirectoryIndex set to true in result_normalize_options", () => {
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    const source = fs.readFileSync(modulePath, 'utf8');
    expect(source).toContain('removeDirectoryIndex: true');
  });
});