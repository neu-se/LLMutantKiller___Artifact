describe('Q Promise Library', () => {
  it('should create a Q object when used as a module', () => {
    const Q = require('../../../../../../../../../subject_repositories/q/q.js');
    expect(Q).toBeDefined();
    expect(typeof Q).toBe('function');
    const promise = Q.resolve('test');
    expect(promise).toBeDefined();
    expect(typeof promise.then).toBe('function');
    promise.then((value) => {
      expect(value).toBe('test');
    });
  });
});