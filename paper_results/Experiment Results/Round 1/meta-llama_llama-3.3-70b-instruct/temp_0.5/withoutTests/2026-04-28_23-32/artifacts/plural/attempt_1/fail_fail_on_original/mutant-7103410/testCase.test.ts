import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form of a word', () => {
    expect(plural('cat', 2)).toBe('cats');
    expect(plural('child', 2)).toBe('children');
    expect(plural('foot', 2)).toBe('feet');
    expect(plural('tooth', 2)).toBe('teeth');
    expect(plural('man', 2)).toBe('men');
    expect(plural('woman', 2)).toBe('women');
    expect(plural('person', 2)).toBe('people');
    expect(plural('mouse', 2)).toBe('mice');
    expect(plural('goose', 2)).toBe('geese');
    expect(plural('deer', 2)).toBe('deer');
    expect(plural('sheep', 2)).toBe('sheep');
    expect(plural('bison', 2)).toBe('bison');
    expect(plural('moose', 2)).toBe('moose');
    expect(plural('fish', 2)).toBe('fish');
    expect(plural('series', 2)).toBe('series');
    expect(plural('news', 2)).toBe('news');
    expect(plural('species', 2)).toBe('species');
    expect(plural('aircraft', 2)).toBe('aircraft');
    expect(plural('craft', 2)).toBe('craft');
  });
});