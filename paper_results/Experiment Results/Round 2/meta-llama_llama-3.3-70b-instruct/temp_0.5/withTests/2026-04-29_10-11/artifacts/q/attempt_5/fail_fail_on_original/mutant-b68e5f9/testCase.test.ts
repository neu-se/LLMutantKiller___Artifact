import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('promise nodeify', () => {
    it('should return the promise when no callback is provided', () => {
        const promise = Q(10);
        const result = promise.nodeify();
        expect(result).toBe(promise);
    });
});