import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('promise nodeify', () => {
    it('should return this when a callback is provided and no error occurs', () => {
        const promise = Q(10);
        const callback = jest.fn();
        const result = promise.nodeify(callback);
        expect(result).toBe(promise);
    });

    it('should not return this when a callback is provided and an error occurs', () => {
        const promise = Q.reject('error');
        const callback = jest.fn();
        const result = promise.nodeify(callback);
        expect(result).not.toBe(promise);
    });
});