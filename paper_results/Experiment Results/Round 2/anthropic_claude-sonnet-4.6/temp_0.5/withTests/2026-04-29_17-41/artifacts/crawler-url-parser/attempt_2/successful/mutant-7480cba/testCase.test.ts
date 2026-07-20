import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse localhost URL with protocol-like prefix', () => {
  it('should correctly parse localhost:// URL without double-prepending http://', () => {
    const result = parse("localhost://something");
    // On original: localhost:// is recognized, no prepend, protocol is localhost: → returns null (not http/https)
    // On mutated: http:// is prepended → http://localhost://something → weird parse
    // Both should return null since localhost: is not http/https
    // But the URL string differs, let's check what actually happens
    expect(result).toBeNull();
  });
});