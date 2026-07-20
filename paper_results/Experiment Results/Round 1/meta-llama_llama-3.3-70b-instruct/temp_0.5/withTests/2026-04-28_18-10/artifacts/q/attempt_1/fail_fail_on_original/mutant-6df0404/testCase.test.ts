import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should stop unhandled rejection tracking when Q.stopUnhandledRejectionTracking is called with trackUnhandledRejections set to false", () => {
        Q.stopUnhandledRejectionTracking();
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual([]);
    });

    it("should not stop unhandled rejection tracking when Q.stopUnhandledRejectionTracking is called with trackUnhandledRejections set to true", () => {
        Q.stopUnhandledRejectionTracking();
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Test rejection"]);
    });
});