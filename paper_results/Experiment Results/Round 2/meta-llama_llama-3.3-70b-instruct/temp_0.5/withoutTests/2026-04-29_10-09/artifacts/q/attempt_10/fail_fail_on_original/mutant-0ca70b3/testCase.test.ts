import { filterStackString } from './q.js';

describe('filterStackString', () => {
  it('should return a non-empty string for a non-empty input', () => {
    const input = 'line1\nline2\nline3';
    const result = filterStackString(input);
    expect(result).not.toBe('');
  });
});