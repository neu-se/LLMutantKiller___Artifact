import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should return the promise itself when the inspected state is 'pending' or 'rejected'", () => {
        const promise = Q.reject("Test rejection");
        const inspected = promise.inspect();
        expect(promise.valueOf()).toBe(promise);
    });
});