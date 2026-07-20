describe('Q Promise Library', () => {
  it('should create a Q object when used as a module', () => {
    const Q = require('../../../../../../../../../subject_repositories/q/q.js');
    expect(Q).toBeDefined();
    expect(typeof Q).toBe('function');
  });
});