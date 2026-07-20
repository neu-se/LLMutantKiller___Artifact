import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return the original value when using thenResolve", () => {
        const promise = Q.resolve("test");
        const thenResolvePromise = promise.thenResolve("new value");
        thenResolvePromise.then((value) => {
            expect(value).toBe("new value");
        });
    });
});