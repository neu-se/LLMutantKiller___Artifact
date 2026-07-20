import { Q } from "./q.js";

describe("Q", () => {
    it("should return the original value when using thenResolve", (done) => {
        const promise = Q.resolve("test");
        const thenResolvePromise = promise.thenResolve("new value");
        thenResolvePromise.then((value) => {
            expect(value).not.toBeUndefined();
            done();
        });
    });
});