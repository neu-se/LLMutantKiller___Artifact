import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle null error', () => {
        const promise = Q.reject(null);
        const error = promise.catch((error: any) => {
            expect(error).toBeNull();
        });
        return error;
    });
});