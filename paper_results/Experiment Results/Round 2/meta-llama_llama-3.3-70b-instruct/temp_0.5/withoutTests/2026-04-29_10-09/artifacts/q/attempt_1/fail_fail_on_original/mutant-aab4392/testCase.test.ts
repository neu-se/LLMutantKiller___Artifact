import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should handle long stack traces correctly', () => {
    const error = new Error('Test error');
    error.stack = 'Error: Test error\n    at test (/path/to/test.js:1:1)\n    at Module._compile (module.js:1:1)\n    at Object.Module._extensions..js (module.js:1:1)';
    const lines = error.stack.split('\n');
    const filterStackString = Q.filterStackString(error.stack);

    expect(filterStackString).not.toContain('at Module._compile');
    expect(filterStackString).not.toContain('at Object.Module._extensions..js');
  });
});