import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher malformed captures validation', () => {
  it('should throw an error with a descriptive message for malformed captures', () => {
    const invalidSpec = '/:invalid:capture';
    expect(() => {
      new Matcher(invalidSpec);
    }).toThrow('Path contains malformed captures');
  });
});