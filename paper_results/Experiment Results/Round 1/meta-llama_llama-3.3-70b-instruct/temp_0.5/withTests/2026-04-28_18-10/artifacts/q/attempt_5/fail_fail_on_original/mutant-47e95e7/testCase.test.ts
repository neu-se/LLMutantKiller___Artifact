import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should correctly handle Promise.prototype.valueOf', () => {
        const promise = Q(10);
        expect(promise.valueOf()).toBe(promise);
    });
});