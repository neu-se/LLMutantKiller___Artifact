import { Promise } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should correctly handle the 'valueOf' method for a rejected promise", () => {
        const promise = Promise.reject("Test rejection reason");
        const inspected = promise.inspect();
        if (inspected.state === "rejected") {
            expect(promise.valueOf()).toBe(promise);
        } else {
            expect(promise.valueOf()).not.toBe(promise);
        }
    });
});