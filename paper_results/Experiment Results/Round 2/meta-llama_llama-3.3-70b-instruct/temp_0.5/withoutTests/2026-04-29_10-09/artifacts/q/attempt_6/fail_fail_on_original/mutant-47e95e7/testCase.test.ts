import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should return the promise value when the state is 'fulfilled' and not return the promise itself when the state is 'rejected'", () => {
        const fulfilledPromise = Q.resolve("Test resolution");
        const rejectedPromise = Q.reject("Test rejection");

        expect(fulfilledPromise.valueOf()).not.toBe(fulfilledPromise);
        expect(rejectedPromise.valueOf()).toBe(rejectedPromise);
    });
});