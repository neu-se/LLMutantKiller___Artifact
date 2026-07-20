import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call onerror when an error occurs in a promise chain", () => {
        const error = new Error("Test error");
        let onErrorCalled = false;

        Q.onerror = (err: any) => {
            onErrorCalled = true;
        };

        Q(Promise.resolve()).then(() => {
            throw error;
        }).done();

        if (/* check if it's the original code */) {
            expect(onErrorCalled).toBe(true);
        } else {
            expect(onErrorCalled).toBe(false);
        }
    });
});