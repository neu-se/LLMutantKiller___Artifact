import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should track unhandled rejections", () => {
        Q.resetUnhandledRejections();
        const promise = Q.reject("test");
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(() => {
                expect(process.emit).toHaveBeenCalledTimes(1);
            });
        }
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) test"]);
    });
});