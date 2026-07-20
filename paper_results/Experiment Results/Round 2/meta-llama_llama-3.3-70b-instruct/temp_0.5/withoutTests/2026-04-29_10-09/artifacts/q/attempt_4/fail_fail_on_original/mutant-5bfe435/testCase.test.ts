import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should resolve a promise when process.nextTick is available", (done) => {
        const promise = Q.resolve("test");
        promise.then((value: string) => {
            expect(value).toBe("test");
            done();
        });
        // Check if nextTick is called
        const originalNextTick = process.nextTick;
        let nextTickCalled = false;
        const originalProcessNextTick = process.nextTick;
        process.nextTick = () => {
            nextTickCalled = true;
            originalProcessNextTick(() => {});
        };
        expect(nextTickCalled).toBe(false);
        setTimeout(() => {
            expect(nextTickCalled).toBe(true);
            process.nextTick = originalProcessNextTick;
            done();
        }, 10);
    });
});