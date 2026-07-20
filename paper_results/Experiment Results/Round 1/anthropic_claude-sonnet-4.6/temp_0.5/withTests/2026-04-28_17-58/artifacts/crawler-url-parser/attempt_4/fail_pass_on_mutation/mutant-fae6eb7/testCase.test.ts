import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl hash stripping edge case', () => {
  it('should handle baseUrl where hash stripping affects URL resolution with newline in base', () => {
    // Try to find any input that distinguishes the two regexes
    // The only difference: /#.*$/ won't match if there's a non-terminal \n after #
    // but /#.*/ will match up to the \n
    // Since \n is illegal, let's verify the illegal chars check catches it
    const resultWithNewline = parse("page", "http://www.example.com/path#frag\nmore");
    // Should be null because \n is illegal
    expect(resultWithNewline).toBeNull();
  });
});