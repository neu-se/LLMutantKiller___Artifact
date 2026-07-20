import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call catch method without error', () => {
        const promise = Q.resolve();
        expect(() => promise.catch(() => {})).not.toThrow();
    });
});