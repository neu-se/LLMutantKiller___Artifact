import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise without throwing an error', () => {
        expect(() => {
            var q = Q.resolve();
        }).not.toThrow();
    });
});