import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should track unhandled rejections", () => {
        Q.trackUnhandledRejections = true;
        Q.resetUnhandledRejections();
        const promise = Q.reject("Test rejection");
        expect(Q.getUnhandledReasons().length).toBe(1);
        promise.catch(() => {});
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});