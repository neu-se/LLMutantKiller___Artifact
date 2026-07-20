import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', () => {
    it('should handle exceptions correctly', () => {
        const asyncFunction = Q.async(function* () {
            yield Q.reject('Test error');
        });
        expect(asyncFunction()).rejects.toThrow('Test error');
    });
});