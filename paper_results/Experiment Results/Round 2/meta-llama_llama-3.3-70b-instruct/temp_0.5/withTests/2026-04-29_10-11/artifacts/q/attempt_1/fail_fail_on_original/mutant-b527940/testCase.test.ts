import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should track unhandled rejections", () => {
        const promise = Q.reject(new Error("Test error"));
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Error: Test error"]);
    });
});