import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections when Q.stopUnhandledRejectionTracking is called with trackUnhandledRejections set to true", () => {
        Q.stopUnhandledRejectionTracking();
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Test rejection"]);
    });
});