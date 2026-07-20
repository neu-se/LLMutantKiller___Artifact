import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', () => {
    it('should throw an error when the generator throws an exception', () => {
        const asyncFunction = Q.async(function* () {
            throw new Error('Test error');
        });
        expect(() => asyncFunction()).toThrowError('Test error');
    });
});