import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should filter stack traces correctly', () => {
    const error = new Error('Test error');
    const stack = error.stack;
    const lines = stack.split('\n');
    const filteredLines = Q.filterStackString(stack);

    expect(filteredLines).not.toBe('');
  });
});