import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should track unhandled rejections", () => {
        Q.resetUnhandledRejections();
        const promise = Q.reject(new Error("Test error"));
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Error: Test error"]);
        Q.resetUnhandledRejections();
        const promise2 = Q.reject(new Error("Test error 2"));
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Error: Test error 2"]);
    });
});