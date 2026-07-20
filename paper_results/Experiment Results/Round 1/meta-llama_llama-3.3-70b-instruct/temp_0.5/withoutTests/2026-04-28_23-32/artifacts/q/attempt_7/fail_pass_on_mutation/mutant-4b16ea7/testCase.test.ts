import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use nextTick correctly", (done) => {
        const originalNextTick = Q.nextTick;
        let called = false;

        Q.nextTick(() => {
            called = true;
        });

        global.setTimeout(() => {
            expect(called).toBe(true);
            done();
        }, 10);
    });
});