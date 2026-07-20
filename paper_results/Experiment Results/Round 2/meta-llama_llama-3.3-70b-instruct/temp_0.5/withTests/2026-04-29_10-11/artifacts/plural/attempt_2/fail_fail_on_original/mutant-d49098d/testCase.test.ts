import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should handle empty string in misc array', () => {
    const misc = ['kudo', 'premise', 'shamble', 'glasse', 'spectacle', 'jitter',
      'alm', 'fece', 'bowel', 'sud', 'entrail', 'electronic', 'outskirt', 'odd', 'tropic',
      'riche', 'surrounding', 'thank', 'heroic', 'remain', 'amend'
    ];
    const miscWithEmptyString = [...misc, ''];
    const regex = new RegExp('\\b(?:' + miscWithEmptyString.join('|') + ')s\\b', 'i');
    expect(regex.test('')).toBe(false);
    expect(plural('')).toBe('');
  });
});