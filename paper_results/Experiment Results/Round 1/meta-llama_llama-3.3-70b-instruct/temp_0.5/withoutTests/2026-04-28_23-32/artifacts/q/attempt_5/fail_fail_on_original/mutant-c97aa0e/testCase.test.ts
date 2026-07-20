import { Q } from "./q.js";

describe('Q', () => {
    it('should handle any correctly', () => {
        const promises = [Q.resolve(1), Q.reject(2), Q.resolve(3)];
        return Q.all(promises).then((results) => {
            expect(results[0]).toBe(1);
            expect(results[1]).toBeUndefined();
            expect(results[2]).toBe(3);
        });
    });
});