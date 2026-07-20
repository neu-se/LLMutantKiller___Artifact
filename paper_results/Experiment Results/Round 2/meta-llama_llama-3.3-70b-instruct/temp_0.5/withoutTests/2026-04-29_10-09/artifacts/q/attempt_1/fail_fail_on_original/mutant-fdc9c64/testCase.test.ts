import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should filter internal stack frames correctly', () => {
    const error = new Error();
    const stack = error.stack;
    const lines = stack.split('\n');
    const filteredStack = Q.filterStackString(stack);
    const filteredLines = filteredStack.split('\n');

    expect(filteredLines.length).toBeLessThan(lines.length);
  });
});