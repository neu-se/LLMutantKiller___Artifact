import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle words ending with "ICS" in uppercase', () => {
    expect(plural('PHYSICS', 2)).toBe('PHYSICS');
  });
});