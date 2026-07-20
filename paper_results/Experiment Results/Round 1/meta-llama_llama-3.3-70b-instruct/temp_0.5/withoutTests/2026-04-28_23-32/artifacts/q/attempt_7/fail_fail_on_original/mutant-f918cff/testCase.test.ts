import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should reject the promise when an exception is thrown in the promise descriptor', () => {
        expect.assertions(2);
        const promise = q.Promise((resolve, reject) => {
            throw new Error("Test error");
        });
        let thenCalled = false;
        let catchCalled = false;
        return promise.then(() => {
            thenCalled = true;
        }, (error) => {
            catchCalled = true;
            expect(error.message).toBe("Test error");
        }).then(() => {
            expect(thenCalled).toBe(false);
            expect(catchCalled).toBe(true);
        });
    });
});