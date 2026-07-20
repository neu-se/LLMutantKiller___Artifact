import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should have an exception property only when state is rejected', () => {
        const fulfilledPromise = Q.resolve('Test Value');
        const rejectedPromise = Q.reject('Test Error');
        expect('exception' in fulfilledPromise.inspect()).toBe(false);
        expect('exception' in rejectedPromise.inspect()).toBe(true);
    });
});