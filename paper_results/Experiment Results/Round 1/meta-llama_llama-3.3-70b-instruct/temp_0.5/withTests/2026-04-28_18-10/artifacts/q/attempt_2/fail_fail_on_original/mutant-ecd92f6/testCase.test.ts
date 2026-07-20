import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Promise', () => {
    it('should have a default inspect function when none is provided', () => {
        const promise = Q.Promise({}, void 0);
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});