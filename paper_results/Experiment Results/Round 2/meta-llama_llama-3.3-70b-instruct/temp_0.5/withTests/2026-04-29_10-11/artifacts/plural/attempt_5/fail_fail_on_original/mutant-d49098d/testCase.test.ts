import plural = require('./index');

describe('plural', () => {
  it('should handle pluralization of words that end with "s"', () => {
    const misc = ['kudo', 'premise', 'shamble', 'glasse', 'spectacle', 'jitter',
      'alm', 'fece', 'bowel', 'sud', 'entrail', 'electronic', 'outskirt', 'odd', 'tropic',
      'riche', 'surrounding', 'thank', 'heroic', 'remain', 'amend'
    ];
    expect(plural(misc[0] + 's')).toBe(misc[0] + 's');
    expect(plural(misc[1] + 's')).toBe(misc[1] + 's');
  });
});