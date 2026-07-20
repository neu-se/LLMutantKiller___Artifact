import { Q } from "./q.js";

describe('Q.all', () => {
    it('should reject if Q.all is called with a promise that resolves to undefined', () => {
        const promise = Q.resolve(undefined);
        return Q.all([promise]).then((values) => {
            expect(true).toBe(false); // This should not be reached
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});