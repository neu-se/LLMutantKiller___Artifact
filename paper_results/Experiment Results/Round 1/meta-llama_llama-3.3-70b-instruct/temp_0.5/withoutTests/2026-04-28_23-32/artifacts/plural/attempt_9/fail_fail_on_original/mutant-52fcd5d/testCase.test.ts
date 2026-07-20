import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should handle words that are in the misc array correctly', () => {
    expect(plural('tropic', 2)).toBe('tropics');
    expect(plural('alm', 2)).toBe('alms');
    expect(plural('fece', 2)).toBe('feca');
    expect(plural('bowel', 2)).toBe('bowels');
    expect(plural('sud', 2)).toBe('suds');
    expect(plural('entrail', 2)).toBe('entrails');
    expect(plural('electronic', 2)).toBe('electronics');
    expect(plural('outskirt', 2)).toBe('outskirts');
    expect(plural('odd', 2)).toBe('odds');
    expect(plural('tropic', 2)).toBe('tropics');
  });
});