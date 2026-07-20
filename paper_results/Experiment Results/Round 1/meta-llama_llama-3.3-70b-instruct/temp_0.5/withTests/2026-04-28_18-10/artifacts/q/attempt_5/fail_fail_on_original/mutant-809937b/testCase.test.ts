describe("unhandled rejection tracking", () => {
    it("should track unhandled rejections", () => {
        const Q = require("../../../../../../../q.js");
        Q.resetUnhandledRejections();
        const promise = Q.reject("test");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) test"]);
        Q.untrackRejection(promise);
        expect(Q.getUnhandledReasons()).toEqual([]);
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(() => {
                expect(process.emit).toHaveBeenCalledTimes(1);
            });
        }
    });
});