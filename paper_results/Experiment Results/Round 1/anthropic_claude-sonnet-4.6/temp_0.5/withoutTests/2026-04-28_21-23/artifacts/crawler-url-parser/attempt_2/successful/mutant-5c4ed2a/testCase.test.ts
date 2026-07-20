import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with baseUrlStr containing multi-character fragment", () => {
  it("should completely strip multi-character fragments from baseUrlStr", () => {
    // Fragment with 2+ chars after #: original strips it all, mutant does not match
    const baseUrlStr = "http://www.example.com/path/#longsection";
    const relativeUrl = "/other/page.html";

    const result = parse(relativeUrl, baseUrlStr);

    expect(result).not.toBeNull();
    // In original: baseUrlStr fragment is fully stripped, baseurl should not contain fragment
    // In mutant: baseUrlStr fragment is NOT stripped (more than 1 char after #),
    // so the baseurl stored in result will contain the fragment
    expect(result!.baseurl).toBe("http://www.example.com/path/");
  });
});