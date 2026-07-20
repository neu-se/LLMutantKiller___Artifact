import { Q } from './q.js';

describe('Q', () => {
  it('should filter stack traces correctly', () => {
    const stackString = 'line1\nline2\nline3';
    const filteredString = Q.filterStackString(stackString);

    expect(filteredString).not.toBe('');
  });
});