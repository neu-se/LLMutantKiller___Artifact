import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural rules initialization', () => {
  it('should initialize with empty rules array', () => {
    // This test will fail on mutated code because rules won't be an array initially
    const result = plural('test');
    expect(result).toBe('tests');
  });
});