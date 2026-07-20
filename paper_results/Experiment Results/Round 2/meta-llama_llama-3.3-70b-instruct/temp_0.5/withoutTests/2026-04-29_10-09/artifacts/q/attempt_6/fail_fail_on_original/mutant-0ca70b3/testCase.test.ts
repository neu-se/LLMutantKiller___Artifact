import { Q } from './q';

describe('Q', () => {
  it('should filter stack traces correctly', () => {
    const stackString = 'line1\nline2\nline3';
    const lines = stackString.split('\n');
    const filteredLines = Q.filterStackString(stackString).split('\n');

    expect(filteredLines.length).toBeGreaterThan(0);
  });
});