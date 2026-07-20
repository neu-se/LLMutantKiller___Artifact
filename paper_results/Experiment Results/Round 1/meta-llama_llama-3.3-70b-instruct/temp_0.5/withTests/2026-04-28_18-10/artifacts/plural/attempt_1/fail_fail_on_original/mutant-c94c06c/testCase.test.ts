import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', function() {
  it('should handle f/fe ending words correctly', function() {
    expect(plural('roof')).toBe('rooves');
  });
});