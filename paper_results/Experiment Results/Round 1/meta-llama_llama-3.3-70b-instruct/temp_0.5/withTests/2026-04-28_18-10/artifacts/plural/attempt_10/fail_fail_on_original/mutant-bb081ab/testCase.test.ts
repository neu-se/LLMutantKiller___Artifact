import { plural } from './index';

describe('plural', () => {
  it('should handle string rules correctly', () => {
    const originalResult = plural('criterion');
    expect(originalResult).toBe('criteria');
    plural.addRule('criterion', 'newCriteria');
    const newResult = plural('criterion');
    expect(newResult).toBe('newCriteria');
  });
});