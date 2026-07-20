import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should handle words that are the same both singular/plural', () => {
    const misc = ['alm', 'fece', 'bowel', 'sud', 'entrail', 'electronic', 'outskirt', 'odd', 'tropic', 'riche', 'surrounding', 'thank', 'heroic', 'remain', 'amend'];
    expect(plural(misc[misc.length - 1] + 's')).toBe(misc[misc.length - 1] + 's');
    expect(misc.length).toBe(15);
  });
});