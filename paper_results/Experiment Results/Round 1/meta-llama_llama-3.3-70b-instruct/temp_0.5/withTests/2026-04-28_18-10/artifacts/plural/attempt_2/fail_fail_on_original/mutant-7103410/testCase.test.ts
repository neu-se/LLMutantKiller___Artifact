import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('test monkey patching', function () {
  it('should work as intended', function () {
    plural.monkeyPatch();
    expect('test'.plural(2)).toBe('tests');
    plural.unmonkeyPatch();
    expect(() => 'test'.plural()).toThrow(TypeError);
  });
});