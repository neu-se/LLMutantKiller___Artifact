import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should handle words that are the same both singular/plural', () => {
    const tools = ['goggle', 'scissor', 'plier', 'tong', 'tweezer'];
    const clothes = ['trouser', 'pant', 'pantie', 'clothe'];
    const games = ['billiard', 'bowl', 'card', 'dart', 'skittle', 'draught'];
    const illnesses = ['diabete', 'measle', 'mump', 'rabie', 'ricket', 'shingle'];
    const misc = ['alm', 'fece', 'bowel', 'sud', 'entrail', 'electronic', 'outskirt', 'odd', 'tropic', 'riche', 'surrounding', 'thank', 'heroic', 'remain', 'amend'];
    const words = tools.concat(clothes, games, illnesses, misc);
    words.forEach((word) => {
      expect(plural(word + 's')).toBe(word + 's');
    });
    expect(plural('tropics')).toBe('tropics');
  });
});