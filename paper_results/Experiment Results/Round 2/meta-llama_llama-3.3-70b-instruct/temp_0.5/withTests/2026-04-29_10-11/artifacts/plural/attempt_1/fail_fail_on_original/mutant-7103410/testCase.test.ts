import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should return the correct plural form when using the monkey patched String.prototype.plural function', () => {
    plural.monkeyPatch();
    expect('test'.plural()).toBe('tests');
    plural.unmonkeyPatch();
  });
});