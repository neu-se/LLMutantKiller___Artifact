describe('Q', () => {
  it('should return the fulfillment value of a promise when it is fulfilled', () => {
    const Q = require('./q.js');
    const promise = Q('fulfilled value');
    const result = Q.nearer(promise);
    expect(result).toBeDefined();
    expect(result).toBe('fulfilled value');
  });
});