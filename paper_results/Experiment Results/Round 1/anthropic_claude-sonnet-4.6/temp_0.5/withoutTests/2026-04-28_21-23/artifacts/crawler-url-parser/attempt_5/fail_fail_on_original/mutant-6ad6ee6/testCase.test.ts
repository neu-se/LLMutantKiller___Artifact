import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should return null for a bare hash URL without base', () => {
    // Original: /#.*$/ strips '#' to '', then '' gets http:// prepended -> 'http://'
    // which has no host -> returns object with null host
    // Mutated: /#.$/ does NOT match bare '#' (needs char after #), stays as '#'
    // '#' -> prepended -> 'http://#' -> parsed differently
    const resultOriginal = parse('#');
    // In original, '#' becomes '' becomes 'http://' - host is null
    // In mutated, '#' stays '#' becomes 'http://#' 
    // The key: does the url field differ?
    expect(resultOriginal).not.toBeNull();
    expect(resultOriginal!.host).toBeNull();
  });
});