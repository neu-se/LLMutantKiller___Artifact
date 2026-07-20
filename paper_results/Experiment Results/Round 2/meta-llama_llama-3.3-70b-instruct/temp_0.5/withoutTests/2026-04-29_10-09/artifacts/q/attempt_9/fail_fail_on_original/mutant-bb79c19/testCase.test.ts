describe('Q', () => {
  it('should return the fulfillment value of a promise when it is fulfilled', () => {
    const Q = require('../../../../q.js');
    const promise = Q('fulfilled value');
    const result = Q.nearer(promise);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe('string');
    expect(result).toBe('fulfilled value');
  });
});