import plural = require('./index');

describe('plural', () => {
  it('should handle words that are the same both singular/plural', () => {
    expect(plural('tropic')).toBe('tropics');
    expect(plural('tropics')).toBe('tropics');
    const misc = ['kudo', 'premise', 'shamble', 'glasse', 'spectacle', 'jitter',
      'alm', 'fece', 'bowel', 'sud', 'entrail', 'electronic', 'outskirt', 'odd', 'tropic',
      'riche', 'surrounding', 'thank', 'heroic', 'remain', 'amend'];
    misc.forEach((w) => {
      expect(plural(w + 's')).toBe(w + 's');
    });
  });
});