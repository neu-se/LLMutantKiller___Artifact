import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should filter stack traces correctly', () => {
    const error = new Error('Test error');
    const stack = error.stack;
    const filteredStack = Q.filterStackString(stack);

    expect(filteredStack).not.toContain('q.js');
  });
});