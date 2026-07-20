import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should test the behavior of Promise.prototype.post', () => {
        const promise = Q('test');
        const result = promise.post('toString', []);
        expect(result).resolves.not.toThrow();
    });
});