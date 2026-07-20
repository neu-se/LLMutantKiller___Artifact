import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle any correctly', () => {
        const promises = [Q.resolve(1), Q.reject(2), Q.resolve(3)];
        return Q(promises).any().then((result) => {
            expect(result).toBe(1);
        });
    });
});