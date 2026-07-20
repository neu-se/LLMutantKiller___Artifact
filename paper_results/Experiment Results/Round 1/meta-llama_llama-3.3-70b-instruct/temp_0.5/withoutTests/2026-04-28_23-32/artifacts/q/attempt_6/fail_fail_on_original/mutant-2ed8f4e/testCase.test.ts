describe('Q', () => {
  it('should filter out internal and node frames from stack traces', () => {
    const Q = require('../../../../../../../subject_repositories/q/q')();
    const error = new Error();
    error.stack = 'Error\n    at Q.filterStackString (q.js:10:15)\n    at Object.<anonymous> (q.js:20:15)';
    const originalStack = error.stack;
    const filteredStack = Q.filterStackString(originalStack);
    expect(filteredStack).not.toEqual(originalStack);
  });
});