import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a valueOf method that returns the value when the promise is fulfilled", () => {
        const promise = Q(10);
        expect(promise.valueOf()).toBe(10);
    });
});