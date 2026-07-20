import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should strip bare hash leaving empty host when no base URL provided', () => {
    // Original: /#.*$/ matches bare '#' (zero chars after #), strips to ''
    // '' gets 'http://' prepended -> URL.parse gives host ''
    // Mutated: /#.$/ requires exactly one char after #, does NOT match bare '#'
    // '#' stays, gets 'http://' prepended -> 'http://#'
    // URL.parse('http://#') gives host '#' which differs from ''
    const result = parse('#');
    expect(result).not.toBeNull();
    // In original, host should be empty string (from 'http://')
    // In mutated, host would be '#' or similar (from 'http://#')
    expect(result!.host).toBe('');
  });
});