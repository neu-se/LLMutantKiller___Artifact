import { plural } from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should handle words that are the same both singular/plural', () => {
    const tools = ['goggle', 'scissor', 'plier', 'tong', 'tweezer'];
    const clothes = ['trouser', 'pant', 'pantie', 'clothe'];
    const games = ['billiard', 'bowl', 'card', 'dart', 'skittle', 'draught'];
    const illnesses = ['diabete', 'measle', 'mump', 'rabie', 'ricket', 'shingle'];
    const misc = ['kudo', 'premise', 'shamble', 'glasse', 'spectacle', 'jitter',
      'alm', 'fece', 'bowel', 'sud', 'entrail', 'electronic', 'outskirt', 'odd', 'tropic',
      'riche', 'surrounding', 'thank', 'heroic', 'remain', 'amend'];
    tools.concat(clothes, games, illnesses, misc).forEach((w) => {
      expect(plural(w + 's')).toBe(w + 's');
    });
    expect(plural('tropics')).toBe('tropics');
  });
});