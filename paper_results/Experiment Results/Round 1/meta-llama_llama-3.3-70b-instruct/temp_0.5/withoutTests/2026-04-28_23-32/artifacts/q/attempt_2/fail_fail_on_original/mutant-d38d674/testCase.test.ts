import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.makePromise', () => {
    it('should not call the fallback function when the descriptor has the operation', () => {
        const descriptor = {
            test: function () {
                return 'test result';
            }
        };
        const fallback = jest.fn();
        const promise = Q.makePromise(descriptor, fallback);
        const result = promise.promiseDispatch(null, 'test', []);
        expect(fallback).not.toHaveBeenCalled();
        expect(result).resolves.toBe('test result');
    });
});