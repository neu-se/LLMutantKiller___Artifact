import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should not set exception property when state is not rejected', () => {
        const promise = Q({ state: 'pending' });
        const inspected = promise.inspect();
        expect(inspected.exception).toBeUndefined();
    });
});