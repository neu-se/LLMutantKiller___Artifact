import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return the promise itself when no nodeback is provided', () => {
        const promise = Q.resolve('test');
        const result = promise.nodeify();
        expect(result).toBe(promise);
    });
});