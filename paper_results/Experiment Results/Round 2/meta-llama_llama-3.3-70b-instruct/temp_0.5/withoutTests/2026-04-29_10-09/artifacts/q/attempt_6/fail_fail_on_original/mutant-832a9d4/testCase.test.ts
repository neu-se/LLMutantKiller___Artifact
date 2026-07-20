import Q from "./q.js";

describe("Q", () => {
    it("should handle nextTick correctly", (done) => {
        let called = false;
        Q.nextTick(() => {
            called = true;
        });
        setTimeout(() => {
            expect(called).toBe(true);
            done();
        }, 10);
    });

    it("should use setTimeout when MessageChannel is not supported", (done) => {
        let originalSetTimeout = global.setTimeout;
        let called = false;
        global.setTimeout = (fn) => {
            fn();
        };
        Q.nextTick(() => {
            called = true;
        });
        global.setTimeout = originalSetTimeout;
        expect(called).toBe(true);
        done();
    });
});