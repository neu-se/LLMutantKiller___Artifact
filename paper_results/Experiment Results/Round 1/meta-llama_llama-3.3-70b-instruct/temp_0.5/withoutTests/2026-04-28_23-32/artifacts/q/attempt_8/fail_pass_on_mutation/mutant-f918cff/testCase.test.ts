import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should reject the promise when an exception is thrown in the promise descriptor', () => {
        const promise = q.Promise((resolve, reject) => {
            throw new Error("Test error");
        });
        let thenCalled = false;
        let catchCalled = false;
        promise.then(() => {
            thenCalled = true;
        }, (error) => {
            catchCalled = true;
            if (error.message !== "Test error") {
                throw new Error("Unexpected error message");
            }
        }).then(() => {
            if (thenCalled) {
                throw new Error("Then block should not be called");
            }
            if (!catchCalled) {
                throw new Error("Catch block should be called");
            }
        });
    });
});