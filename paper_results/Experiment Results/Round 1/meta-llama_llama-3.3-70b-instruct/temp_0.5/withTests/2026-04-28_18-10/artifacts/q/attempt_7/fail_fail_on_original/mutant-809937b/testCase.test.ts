describe("unhandled rejection tracking", () => {
    it("should track unhandled rejections", () => {
        const Q = require("../../../../../../../q.js");
        Q.resetUnhandledRejections();
        const promise = Q.reject("test");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) test"]);
        const unhandledRejections = Q.unhandledRejections;
        expect(unhandledRejections).toHaveLength(1);
        expect(unhandledRejections[0]).toBe(promise);
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(() => {
                expect(process.emit).toHaveBeenCalledTimes(1);
            });
        }
    });
});