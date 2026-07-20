import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle any correctly', () => {
        const promises = [Q.resolve(1), Q.reject(2), Q.resolve(3)];
        return Q.any(promises).then((result) => {
            expect(result).toBe(1);
        });
    });
});