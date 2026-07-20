import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return undefined when using thenResolve on the mutated code", (done) => {
        const promise = Q.resolve("test");
        const thenResolvePromise = promise.thenResolve();
        thenResolvePromise.then((value) => {
            expect(value).toBeUndefined();
            done();
        });
    });
});