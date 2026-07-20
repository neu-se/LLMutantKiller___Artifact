import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should handle pending promises correctly', () => {
        const promise = Q.defer().promise;
        const inspected = promise.inspect();
        expect(inspected.state).toBe('pending');
        // Check the behavior of the Promise.prototype.valueOf method
        // when the promise is pending
        const valueOfResult = promise.valueOf();
        expect(valueOfResult).toBe(promise);
    });
});