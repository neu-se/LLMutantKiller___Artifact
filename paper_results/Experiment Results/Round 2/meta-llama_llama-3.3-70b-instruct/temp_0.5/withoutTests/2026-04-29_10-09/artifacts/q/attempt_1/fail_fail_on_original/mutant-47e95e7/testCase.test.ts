import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should return a promise with the correct state when the inspected state is 'rejected'", () => {
        const promise = Q.reject("Test rejection");
        const inspected = promise.inspect();
        expect(inspected.state).toBe("rejected");
        expect(promise.valueOf()).toBe(promise);
    });
});