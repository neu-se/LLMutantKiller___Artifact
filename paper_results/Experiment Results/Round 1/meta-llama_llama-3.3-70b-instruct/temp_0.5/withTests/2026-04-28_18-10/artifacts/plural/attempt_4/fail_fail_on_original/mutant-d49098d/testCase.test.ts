import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should handle empty string in misc array', () => {
    var misc = ['kudo', 'premise', 'shamble', 'glasse', 'spectacle', 'jitter',
      'alm', 'fece', 'bowel', 'sud', 'entrail', 'electronic', 'outskirt', 'odd', 'tropic',
      'riche', 'surrounding', 'thank', 'heroic', 'remain', 'amend'
    ];
    var testWord = 'electronic';
    expect(plural(testWord)).toBe(testWord);
    misc.push('');
    expect(plural(testWord)).not.toBe(testWord + 's');
  });
});