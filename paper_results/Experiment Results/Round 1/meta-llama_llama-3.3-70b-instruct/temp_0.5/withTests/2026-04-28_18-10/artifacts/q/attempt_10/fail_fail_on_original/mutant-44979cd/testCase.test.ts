import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should correctly handle CommonJS module exports', () => {
        const deferred = Q.defer();
        expect(typeof deferred).toBe('object');
    });
});