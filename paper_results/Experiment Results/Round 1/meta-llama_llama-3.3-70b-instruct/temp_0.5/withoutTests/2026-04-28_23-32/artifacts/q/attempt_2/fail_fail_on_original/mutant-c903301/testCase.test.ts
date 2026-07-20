import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should throw an error when error is thrown in progress callback', () => {
        const promise = Q.resolve();
        const progressCallback = () => { throw new Error('Test error'); };
        expect(() => promise.then(void 0, void 0, progressCallback)).toThrowError('Test error');
    });
});