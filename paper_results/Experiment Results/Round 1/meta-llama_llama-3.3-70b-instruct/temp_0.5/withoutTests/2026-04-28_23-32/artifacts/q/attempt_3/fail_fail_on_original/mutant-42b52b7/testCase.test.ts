import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections correctly", (done) => {
        Q.stopUnhandledRejectionTracking();
        const promise = Q.reject("Test rejection");
        Q.nextTick.runAfter(() => {
            expect(process.emit).toHaveBeenCalledTimes(1);
            done();
        });
    });
});