describe('Q', () => {
  it('should filter out internal and node frames from stack traces', () => {
    const Q = require('../../../../../../../subject_repositories/q/q')();
    const error = new Error();
    const originalStack = error.stack;
    const filteredStack = Q.filterStackString(originalStack);
    expect(filteredStack).not.toEqual(originalStack);
  });
});