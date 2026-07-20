import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should inspect a promise and return its state', () => {
        const promise = q.Q(1);
        const inspected = promise.inspect();
        expect(inspected.state).toBe('fulfilled');
        expect(inspected.value).toBe(1);
        const rejectedPromise = q.Q.reject('error');
        expect(rejectedPromise.exception).toBe('error');
        expect(rejectedPromise.valueOf()).toBe(rejectedPromise);
    });
});