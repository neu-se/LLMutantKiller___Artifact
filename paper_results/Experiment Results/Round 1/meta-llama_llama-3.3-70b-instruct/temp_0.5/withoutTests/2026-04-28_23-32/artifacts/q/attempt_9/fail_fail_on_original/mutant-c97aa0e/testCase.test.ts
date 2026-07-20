import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle any correctly', () => {
        const promises = [Q.resolve(1), Q.reject(2), Q.resolve(3)];
        expect(Q(promises)).toBeDefined();
        expect(Q(promises).any).toBeDefined();
    });
});