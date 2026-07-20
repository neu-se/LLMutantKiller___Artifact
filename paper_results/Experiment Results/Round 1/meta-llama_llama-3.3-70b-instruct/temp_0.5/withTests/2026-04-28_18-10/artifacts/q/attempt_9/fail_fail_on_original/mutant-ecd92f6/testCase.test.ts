import { Q } from '../../../q.js';

describe('Promise', () => {
    it('should have a default inspect function when none is provided', () => {
        const promise = Q.Promise({}, () => {}, () => ({ state: "unknown" }));
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});