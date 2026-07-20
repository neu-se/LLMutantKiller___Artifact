import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should return the correct plural form for a given word', () => {
    const result = plural('cactus', 2);
    const expected = 'cacti';
    expect(result).toBe(expected);
    if (result !== expected) {
      throw new Error('Test failed');
    }
    const rule = plural('cactus', 2);
    if (rule !== 'cacti') {
      throw new Error('Test failed');
    }
  });
});