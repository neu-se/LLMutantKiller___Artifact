import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should handle pluralization of words that end with "s"', () => {
    const misc = ['kudo', 'premise', 'shamble', 'glasse', 'spectacle', 'jitter',
      'alm', 'fece', 'bowel', 'sud', 'entrail', 'electronic', 'outskirt', 'odd', 'tropic',
      'riche', 'surrounding', 'thank', 'heroic', 'remain', 'amend'
    ];
    const miscWithEmptyString = [...misc, ''];
    const regex = new RegExp('\\b(?:' + miscWithEmptyString.join('|') + ')s\\b', 'i');
    expect(plural('electronic')).toBe('electronics');
  });
});