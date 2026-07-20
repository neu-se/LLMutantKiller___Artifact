import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse mutation - localhost with // path', () => {
  it('should handle localhost:// correctly', () => {
    // localhost:// enters the else block (localhost excluded from outer condition)
    // After pre-conversion (no // at start), currentUrlStr = "localhost://"
    // Original regex: (?!(?:\w+:)?\/\/) - "localhost://" starts with (localhost:)?// -> YES -> no prepend
    // Mutated regex: (?!(?:\w+:)\/\/) - "localhost://" starts with word:// -> localhost:// -> YES -> no prepend  
    // Both: no prepend, protocol = "localhost:" -> null
    const res = parse("localhost://");
    expect(res).toBeNull();
  });
});