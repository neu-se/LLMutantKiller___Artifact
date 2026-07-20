import { Q } from "../../q.js";

describe("Q library", () => {
    it("should track unhandled rejections", () => {
        const promise = Q.reject("Test error");
        expect(Q.getUnhandledReasons().length).toBe(1);
    });
});