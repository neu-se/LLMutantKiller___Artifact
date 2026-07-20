import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should handle pending promises correctly', () => {
        const promise = Q.defer().promise;
        const inspected = promise.inspect();
        expect(inspected.state).toBe('pending');
        // Check the behavior of the Promise.prototype.valueOf method
        // when the promise is pending
        const valueOfResult = promise.valueOf();
        expect(valueOfResult).toBe(promise);
        promise.resolve('test');
        const fulfilledValue = Q(promise).then((value) => value);
        expect(fulfilledValue.isPending()).toBe(false);
    });
});