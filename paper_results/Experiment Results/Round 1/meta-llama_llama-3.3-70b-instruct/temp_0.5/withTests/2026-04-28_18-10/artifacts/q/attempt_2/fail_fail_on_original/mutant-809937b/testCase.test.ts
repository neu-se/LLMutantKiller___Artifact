import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should track unhandled rejections", () => {
        Q.resetUnhandledRejections();
        const promise = Q.defer().promise;
        Q.reject("test");
        Q.nextTick.runAfter(() => {
            Q.untrackRejection(promise);
        });
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});