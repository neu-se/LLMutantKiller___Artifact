import { Q } from './q.js';

describe('Q', () => {
  it('should filter stack traces correctly', () => {
    const stackString = 'line1\nline2\nline3';
    const lines = stackString.split('\n');
    const filteredLines = Q.filterStackString(stackString).split('\n');

    expect(filteredLines.length).toBe(lines.length);
  });
});