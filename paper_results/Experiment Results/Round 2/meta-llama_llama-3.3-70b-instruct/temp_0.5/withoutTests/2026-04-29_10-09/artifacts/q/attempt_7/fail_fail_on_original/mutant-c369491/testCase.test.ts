import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle then method correctly', () => {
        const promise = Q(42);
        promise.then((value: any) => {
            expect(value).toBe(42);
        });
        expect(promise.inspect().state).toBe('fulfilled');
    });
});