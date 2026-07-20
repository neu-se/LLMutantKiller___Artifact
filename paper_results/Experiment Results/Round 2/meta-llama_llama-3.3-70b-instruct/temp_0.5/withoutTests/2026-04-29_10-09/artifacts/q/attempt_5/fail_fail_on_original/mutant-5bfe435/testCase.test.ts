import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use process.nextTick when available", (done) => {
        const originalNextTick = process.nextTick;
        let nextTickCalled = false;
        process.nextTick = () => {
            nextTickCalled = true;
        };
        const promise = Q.resolve("test");
        promise.then(() => {
            expect(nextTickCalled).toBe(true);
            process.nextTick = originalNextTick;
            done();
        });
    });
});