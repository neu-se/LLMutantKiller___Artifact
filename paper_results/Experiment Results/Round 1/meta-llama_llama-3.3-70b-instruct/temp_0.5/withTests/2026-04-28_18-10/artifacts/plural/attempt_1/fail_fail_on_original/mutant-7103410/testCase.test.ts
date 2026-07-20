import { plural } from '../../../../../index';

describe('test monkey patching', function () {
  it('should work as intended', function () {
    plural.monkeyPatch();
    expect(String('test').plural(2)).toBe('tests');
    plural.unmonkeyPatch();
    expect(() => String('test').plural()).toThrow(TypeError);
  });
});