import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.makePromise', () => {
    it('should call the fallback function when the descriptor does not have the operation', () => {
        const descriptor = {};
        const fallback = jest.fn();
        const promise = Q.makePromise(descriptor, fallback);
        promise.promiseDispatch(null, 'test', []);
        expect(fallback).toHaveBeenCalledTimes(1);
        expect(fallback).toHaveBeenCalledWith('test', []);
    });
});