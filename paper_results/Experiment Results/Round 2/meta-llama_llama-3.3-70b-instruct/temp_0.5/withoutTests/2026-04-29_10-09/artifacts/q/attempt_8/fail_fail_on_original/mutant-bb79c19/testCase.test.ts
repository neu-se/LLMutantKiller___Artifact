describe('Q', () => {
  it('should return the fulfillment value of a promise when it is fulfilled', () => {
    const q = require('./q');
    const Q = q.Q;
    const promise = Q('fulfilled value');
    const result = Q.nearer(promise);
    expect(typeof result).not.toBe('undefined');
    expect(result).toBe('fulfilled value');
  });
});