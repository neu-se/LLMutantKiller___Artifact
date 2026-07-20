describe("q", () => {
  it("should handle the mutation", () => {
    const q = require('./q');
    const Q = q.Q;
    Q.longStackSupport = true;
    const p = Q.defer();
    p.reject(new Error());
    expect(p.promise.isRejected()).toBe(true);
  });
});