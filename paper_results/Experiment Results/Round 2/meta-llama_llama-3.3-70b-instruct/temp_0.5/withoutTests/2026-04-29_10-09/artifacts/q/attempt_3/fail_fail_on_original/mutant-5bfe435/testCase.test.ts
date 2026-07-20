import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should resolve a promise when process.nextTick is available", (done) => {
        const promise = Q.resolve("test");
        promise.then((value) => {
            expect(value).toBe("test");
            done();
        });
        // Check if nextTick is called
        const originalNextTick = process.nextTick;
        let nextTickCalled = false;
        process.nextTick = () => {
            nextTickCalled = true;
        };
        // Reset nextTick
        process.nextTick = originalNextTick;
        expect(nextTickCalled).toBe(true);
    });
});