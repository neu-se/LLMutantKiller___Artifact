import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should set exception property when state is rejected', () => {
        const promise = Q.reject('Test Error');
        const inspected = promise.inspect();
        expect(inspected.exception).toBe('Test Error');
    });
});