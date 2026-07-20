import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that end with specific suffixes', () => {
    expect(plural('electronic')).toBe('electronics');
    expect(plural('sud')).toBe('suds');
    expect(plural('entrail')).toBe('entrails');
    expect(plural('alm')).toBe('alms'); 
    expect(plural('fece')).toBe('feces'); 
    expect(plural('bowel')).toBe('bowels'); 
    expect(plural('sud')).toBe('suds'); 
    expect(plural('entrail')).toBe('entrails'); 
    expect(plural('outskirt')).toBe('outskirts'); 
    expect(plural('odd')).toBe('odds'); 
    expect(plural('tropic')).toBe('tropics'); 
    expect(plural('')).not.toBe(''); // This test should fail on the mutated code because the mutated code has an empty string in the misc array
  });
});