import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking behavior", () => {
    it("should track unhandled rejections correctly", () => {
        Q.resetUnhandledRejections();
        const promise = Q.reject("Test rejection");
        Q.nextTick.runAfter(function () {
            expect(Q.getUnhandledReasons()).toEqual(["(no stack) Test rejection"]);
        });
    });
});