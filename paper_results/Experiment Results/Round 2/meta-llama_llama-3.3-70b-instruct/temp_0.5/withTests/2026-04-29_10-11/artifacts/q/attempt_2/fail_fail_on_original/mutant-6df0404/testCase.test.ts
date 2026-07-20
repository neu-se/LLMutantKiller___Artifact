import { Q } from "../../../../../q.js";

describe("Q.stopUnhandledRejectionTracking", () => {
    it("should stop tracking unhandled rejections", () => {
        Q.reject("Test rejection");
        Q.stopUnhandledRejectionTracking();
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});