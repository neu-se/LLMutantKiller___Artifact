import * as fs from "fs";
import * as path from "path";

describe('result_normalize_options constant', () => {
  it('should define result_normalize_options with stripWWW set to true', () => {
    const filePath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    const source = fs.readFileSync(filePath, "utf-8");
    expect(source).toContain("stripWWW: true");
  });
});