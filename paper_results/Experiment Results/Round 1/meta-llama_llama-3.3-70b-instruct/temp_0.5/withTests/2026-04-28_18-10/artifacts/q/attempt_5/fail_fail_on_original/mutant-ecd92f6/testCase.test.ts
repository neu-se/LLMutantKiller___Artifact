import { Q } from '../../../q.js';

describe('Promise', () => {
    it('should have a default inspect function when none is provided', () => {
        const promise = Q.Promise({}, function fallback() {
            return {};
        }, function inspect() {
            return { state: "unknown" };
        });
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});