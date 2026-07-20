import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with baseUrl containing fragment", () => {
  it("should return a valid result when baseUrl has a fragment and current URL is relative", () => {
    // When baseUrlStr has a fragment, the original strips it cleanly.
    // The mutated code replaces '#.*' with 'Stryker was here!' making the base URL invalid.
    // A relative URL resolved against a corrupted base URL will produce null or wrong result.
    const result = parse("/about", "http://www.example.com/home#section");
    // Original: baseUrlStr becomes "http://www.example.com/home", resolves correctly
    // Mutated: baseUrlStr becomes "http://www.example.com/homeStryker was here!" 
    // which has illegal chars (spaces), causing _has_illegal_chars to return null
    expect(result).not.toBeNull();
    expect(result!.host).toBe("www.example.com");
    expect(result!.path).toBe("/about");
  });
});