import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse url normalization options", () => {
  it("should strip www from URLs as per result_normalize_options stripWWW:true", () => {
    // stripWWW: true is in result_normalize_options
    // If normalize-url is being applied, www should be stripped
    const result = parse("http://www.example.com/");
    expect(result).not.toBeNull();
    // If normalize-url options are applied with stripWWW:true, www is removed
    expect(result!.host).not.toContain("www");
  });
});