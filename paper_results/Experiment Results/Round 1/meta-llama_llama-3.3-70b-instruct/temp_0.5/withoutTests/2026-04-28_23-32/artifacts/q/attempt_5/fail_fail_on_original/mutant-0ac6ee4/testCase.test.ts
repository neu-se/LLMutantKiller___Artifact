import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create an error with the correct message when a timeout occurs', () => {
        const ms = 100;
        const error = new Error();
        const promise = Q.timeout(Promise.resolve(), ms, error);
        return promise.catch((err: any) => {
            expect(err.message).toContain("Timed out after");
            expect(err.message).toContain(ms.toString());
            expect(err.message).toContain("ms");
        });
    });
});