import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly filter internal frames from stack traces', () => {
    const error = new Error('Test error');
    const stack = error.stack as string;
    const lines = stack.split('\n');

    const promise = Q.reject(error);

    const filteredStack = promise.stack;
    const originalStack = error.stack;

    expect(filteredStack).not.toContain('(module.js:');
    expect(filteredStack).not.toContain('(node.js:');

    expect(originalStack).toContain('(module.js:');
    expect(originalStack).toContain('(node.js:');
  });
});