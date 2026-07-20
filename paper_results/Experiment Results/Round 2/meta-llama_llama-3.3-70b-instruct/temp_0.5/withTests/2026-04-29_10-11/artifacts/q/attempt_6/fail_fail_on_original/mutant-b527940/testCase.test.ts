import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should track unhandled rejections", () => {
        const promise = Q.reject("Test error");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Test error"]);
    });
});