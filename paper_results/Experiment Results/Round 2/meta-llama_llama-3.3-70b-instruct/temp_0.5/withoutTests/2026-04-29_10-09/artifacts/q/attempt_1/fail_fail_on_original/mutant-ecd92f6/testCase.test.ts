import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with a fulfilled state when inspect is undefined', () => {
        const promise = Q.Promise({}, void 0, void 0);
        expect(promise.inspect().state).toBe("unknown");
    });
});