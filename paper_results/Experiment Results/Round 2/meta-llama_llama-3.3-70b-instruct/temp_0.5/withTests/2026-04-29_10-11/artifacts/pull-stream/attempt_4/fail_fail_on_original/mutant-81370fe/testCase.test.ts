import pull from '../pull.js';

describe('pull', () => {
  it('should handle an object as an argument', () => {
    const obj = { source: () => {} };
    const s = { sink: () => {}, source: () => {} };
    expect(() => pull(obj, s)).not.toThrow();
  });
});