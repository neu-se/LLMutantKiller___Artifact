import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', function() {
  it('should correctly pluralize "woman"', function() {
    expect(plural('woman')).toBe('women');
    expect(plural('Woman')).toBe('Women');
    expect(plural('WoMan')).toBe('WoMen');
  });
});