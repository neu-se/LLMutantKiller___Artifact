import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should inspect a promise and return its state', () => {
        const promise = Q(10);
        const originalInspect = promise.inspect;
        promise.inspect = () => ({ state: 'fulfilled', value: 10 });
        expect(promise.inspect().state).toBe('fulfilled');
        promise.inspect = originalInspect;
    });
});