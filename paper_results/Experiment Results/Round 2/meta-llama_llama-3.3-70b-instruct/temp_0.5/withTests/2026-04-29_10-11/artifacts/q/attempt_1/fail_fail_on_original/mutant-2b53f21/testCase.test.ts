import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.reject", () => {
    it("should untrack the rejection when a rejection handler is provided", () => {
        const rejection = Q.reject("reason");
        const spy = jest.fn();
        rejection.then(null, spy);
        expect(spy).toHaveBeenCalledTimes(1);
        // If untrackRejection is not called, this should throw an error
        expect(() => Q.getUnhandledReasons()).not.toThrow();
    });
});