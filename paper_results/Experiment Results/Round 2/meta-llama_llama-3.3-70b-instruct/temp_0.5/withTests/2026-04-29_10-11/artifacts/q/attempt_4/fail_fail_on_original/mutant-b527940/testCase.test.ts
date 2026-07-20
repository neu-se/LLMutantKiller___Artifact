import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should track unhandled rejections", () => {
        Q.resetUnhandledRejections();
        const promise = Q.reject(new Error("Test error"));
        Q.nextTick(() => {
            expect(Q.getUnhandledReasons().length).toBe(1);
        });
    });
});