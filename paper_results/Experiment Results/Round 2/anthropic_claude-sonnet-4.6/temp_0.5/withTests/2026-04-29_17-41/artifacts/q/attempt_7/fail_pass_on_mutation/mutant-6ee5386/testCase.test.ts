import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap static method", () => {
    it("should reject when callback throws an exception", () => {
        const error = new Error("tap error");
        
        return (Q as any).tap(Q("value"), function() {
            throw error;
        }).then(
            function() {
                throw new Error("should have rejected");
            },
            function(reason: Error) {
                expect(reason).toBe(error);
            }
        );
    });
});