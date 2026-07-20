import { Q } from "../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly handle error stack traces', () => {
        const promise = Q.reject(new Error('Test error'));
        const error = promise.catch((error) => error);
        expect(error).toBeInstanceOf(Promise);
        error.then((error) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.stack).toContain('makeStackTraceLong');
        });
    });
});