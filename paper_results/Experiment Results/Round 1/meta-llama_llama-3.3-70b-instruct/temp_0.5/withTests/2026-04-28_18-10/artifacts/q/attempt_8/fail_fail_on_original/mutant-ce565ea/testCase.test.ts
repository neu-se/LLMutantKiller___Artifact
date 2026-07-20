import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should correctly handle the valueOf method", () => {
        const promise = Q.defer().promise;
        const inspected = promise.inspect();

        if (inspected.state === "pending" || inspected.state === "rejected") {
            expect(promise.valueOf()).toBe(promise);
        } else {
            expect(promise.valueOf()).not.toBe(promise);
        }
    });
});