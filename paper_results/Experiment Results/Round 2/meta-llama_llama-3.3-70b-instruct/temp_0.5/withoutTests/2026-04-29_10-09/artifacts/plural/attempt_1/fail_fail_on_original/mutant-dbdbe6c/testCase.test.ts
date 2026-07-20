import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should not override existing plural function', () => {
    String.prototype.plural = () => 'custom implementation';
    plural.monkeyPatch();
    expect(String.prototype.plural()).toBe('custom implementation');
  });
});