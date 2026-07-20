import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.reject", () => {
    it("should untrack the rejection when a rejection handler is provided", () => {
        Q.resetUnhandledRejections();
        const rejection = Q.reject("reason");
        const spy = jest.fn();
        rejection.then(null, spy);
        return rejection.then(null, () => {
            expect(spy).toHaveBeenCalledTimes(1);
            const unhandledReasons = Q.getUnhandledReasons();
            expect(unhandledReasons).toEqual([]);
        });
    });
});