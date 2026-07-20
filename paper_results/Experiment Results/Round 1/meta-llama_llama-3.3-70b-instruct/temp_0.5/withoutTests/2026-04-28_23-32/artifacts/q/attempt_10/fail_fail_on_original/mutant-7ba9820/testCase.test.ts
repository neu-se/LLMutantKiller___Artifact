describe('Q', () => {
  it('should invoke the ninvoke method correctly', () => {
    const Q = require('../../../../../../../../subject_repositories/q/q.js');
    const promise = Q();
    const name = 'test';
    const args = ['arg1', 'arg2'];

    // Check if ninvoke method exists
    expect(typeof promise.ninvoke).toBe('function');

    // Call ninvoke method
    const result = promise.ninvoke(name, ...args);

    // Check if result is a promise
    expect(result).toBeInstanceOf(Q);
  });
});