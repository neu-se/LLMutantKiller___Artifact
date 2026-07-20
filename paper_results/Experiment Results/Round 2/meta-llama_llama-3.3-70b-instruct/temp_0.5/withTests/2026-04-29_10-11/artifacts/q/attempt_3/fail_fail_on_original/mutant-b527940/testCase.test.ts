import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should track unhandled rejections", () => {
        Q.resetUnhandledRejections();
        const promise = Q.reject(new Error("Test error"));
        expect(Q.getUnhandledReasons().length).toBe(1);
        Q.resetUnhandledRejections();
        const promise2 = Q.reject(new Error("Test error 2"));
        expect(Q.getUnhandledReasons().length).toBe(1);
    });
});