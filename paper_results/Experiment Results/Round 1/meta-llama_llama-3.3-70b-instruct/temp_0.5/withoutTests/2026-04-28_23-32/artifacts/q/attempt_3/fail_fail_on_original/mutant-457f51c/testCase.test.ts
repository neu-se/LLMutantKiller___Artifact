import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should not set exception property when state is not rejected', () => {
        const promise = Q({ state: 'fulfilled', value: 'Test Value' });
        const inspected = promise.inspect();
        expect(inspected.exception).toBeUndefined();
        const mutatedPromise = Q({ state: 'rejected', reason: 'Test Reason' });
        const mutatedInspected = mutatedPromise.inspect();
        expect(mutatedInspected.exception).toBe('Test Reason');
    });
});