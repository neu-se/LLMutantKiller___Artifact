const Q = require('./q.js');

describe("Q", () => {
    it("should return the original value when using thenResolve", (done) => {
        const promise = Q.resolve("test");
        const thenResolvePromise = promise.thenResolve("new value");
        thenResolvePromise.then((value: string) => {
            expect(value).toBe("new value");
            done();
        });
    });
});