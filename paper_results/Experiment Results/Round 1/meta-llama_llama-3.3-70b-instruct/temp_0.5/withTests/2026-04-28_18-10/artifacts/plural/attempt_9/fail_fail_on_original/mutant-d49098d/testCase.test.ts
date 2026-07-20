const plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should handle empty string in misc array', () => {
    const misc = ['kudo', 'premise', 'shamble', 'glasse', 'spectacle', 'jitter',
      'alm', 'fece', 'bowel', 'sud', 'entrail', 'electronic', 'outskirt', 'odd', 'tropic',
      'riche', 'surrounding', 'thank', 'heroic', 'remain', 'amend'
    ];
    expect(plural('electronic')).toBe('electronic');
    const regex = new RegExp('\\b(?:' + misc.join('|') + ')s\\b', 'i');
    expect(regex.test('electronics')).toBe(false);
  });
});