import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse with baseUrlStr containing multi-character fragment", () => {
  it("should completely strip a multi-character fragment from baseUrlStr affecting host resolution", () => {
    // baseUrlStr = "http://example.com#longsuffix"
    // Original /#.*$/  removes "#longsuffix" -> "http://example.com"
    // Mutated  /#.$/ removes only "#l"       -> "http://example.comongsuffix"
    //
    // Resolving "/page" against the corrupted base gives a different host
    // Original result host: "example.com"
    // Mutated result host:  "example.comongsuffix"

    const result = parse("/page", "http://example.com#longsuffix");

    expect(result).not.toBeNull();
    expect(result!.host).toBe("example.com");
    expect(result!.url).toBe("http://example.com/page");
  });
});