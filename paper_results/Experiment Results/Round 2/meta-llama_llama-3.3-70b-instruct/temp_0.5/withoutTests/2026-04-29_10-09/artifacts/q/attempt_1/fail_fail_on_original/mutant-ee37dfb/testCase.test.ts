import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should test the behavior of Promise.prototype.post', () => {
        const promise = Q.resolve('test');
        const result = promise.post('toString', []);
        expect(result).resolves.toEqual('test');
    });
});