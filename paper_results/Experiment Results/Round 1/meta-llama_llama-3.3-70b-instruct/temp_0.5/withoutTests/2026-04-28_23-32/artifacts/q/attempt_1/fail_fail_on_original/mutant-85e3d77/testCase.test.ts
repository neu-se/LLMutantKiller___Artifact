import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should track unhandled rejections", () => {
        const promise = Q.reject("Test rejection");
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
        promise.catch(() => {});
        Q.nextTick(() => {
            expect(Q.getUnhandledReasons()).toEqual([]);
        });
    });
});