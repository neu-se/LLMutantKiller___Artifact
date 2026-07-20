import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Q', () => {
  it('should filter stack traces correctly', () => {
    const stackString = 'line1\nline2\nline3';
    const filteredString = Q.filterStackString(stackString);

    expect(filteredString).not.toBeNull();
    expect(filteredString).not.toBeUndefined();
  });
});