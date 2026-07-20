import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise with a pending state when the inspected state is pending or rejected', () => {
        const promise = Q.defer().promise;
        const inspected = promise.inspect();
        const valueOf = promise.valueOf();
        expect(inspected.state).toBe('pending');
        expect(valueOf).toBe(promise);
    });
});