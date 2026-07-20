import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the error handler when a promise is rejected', () => {
        let errorHandled = false;
        const rejectPromise = Q.reject(new Error('Test error'));
        rejectPromise.done(() => {}, () => {
            errorHandled = true;
        });
        expect(errorHandled).toBe(true);
    });
});