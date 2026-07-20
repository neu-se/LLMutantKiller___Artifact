import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should return the correct plural form for a word that matches a rule', () => {
    expect(plural('test')).toBe('tests');
    expect(plural('hero')).toBe('heroes');
    expect(plural('embryo')).toBe('embryos');
    expect(plural('zero')).toBe('zeros');
    expect(plural('cherry')).toBe('cherries');
    expect(plural('sky')).toBe('skies');
    expect(plural('seaway')).toBe('seaways');
    expect(plural('soliloquy')).toBe('soliloquies');
    expect(plural('monkey')).toBe('monkeys');
    expect(plural('day')).toBe('days');
    expect(plural('witch')).toBe('witches');
    expect(plural('box')).toBe('boxes');
    expect(plural('gallery')).toBe('galleries');
    expect(plural('stereo')).toBe('stereos');
    expect(plural('memo')).toBe('memos');
    expect(plural('hero')).toBe('heroes');
    expect(plural('omen')).toBe('omens');
    expect(plural('chilli')).toBe('chillies');
  });
});