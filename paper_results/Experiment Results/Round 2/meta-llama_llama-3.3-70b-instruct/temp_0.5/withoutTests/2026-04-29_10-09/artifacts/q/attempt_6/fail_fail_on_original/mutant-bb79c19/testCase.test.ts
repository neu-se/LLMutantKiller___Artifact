describe('Q', () => {
  it('should return the fulfillment value of a promise when it is fulfilled', () => {
    const Q = require('./q.js');
    const promise = Q('fulfilled value');
    expect(Q.nearer(promise)).toEqual('fulfilled value');
  });
});