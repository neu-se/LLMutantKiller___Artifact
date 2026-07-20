import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should inspect a promise and return its state', () => {
        const promise = Q(10);
        const inspectSpy = jest.spyOn(promise, 'inspect');
        promise.inspect();
        expect(inspectSpy).toHaveBeenCalledTimes(1);
    });
});