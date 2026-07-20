import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return the original value when using thenResolve", () => {
        const promise = Q.resolve("test");
        const thenResolvePromise = promise.thenResolve("new value");
        expect(thenResolvePromise.inspect().state).toBe("pending");
        Q.nextTick(() => {
            expect(thenResolvePromise.inspect().state).toBe("fulfilled");
            expect(thenResolvePromise.inspect().value).toBe("new value");
        });
    });
});