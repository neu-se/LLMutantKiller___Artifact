import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("then fulfilled callback throws", () => {
    it("should not call rejected callback when fulfilled callback throws", () => {
        let rejectedCalled = false;
        const error = new Error("fulfillment error");

        return Q(42)
            .then(
                function() { throw error; },
                function() { rejectedCalled = true; }
            )
            .then(
                function() { throw new Error("should not fulfill"); },
                function(reason: Error) {
                    expect(rejectedCalled).toBe(false);
                    expect(reason).toBe(error);
                }
            );
    });
});