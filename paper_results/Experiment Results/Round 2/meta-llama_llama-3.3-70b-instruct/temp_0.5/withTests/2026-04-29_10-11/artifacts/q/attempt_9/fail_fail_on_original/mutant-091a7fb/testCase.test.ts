import { Q } from "../../../../../../../q.js";

describe('Q.any', () => {
    it('should reject if all promises are rejected', () => {
        const promises = [Q.reject('error1'), Q.reject('error2')];
        return Q.any(promises).then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error.message).toBe('Q can\'t get fulfillment value from any promise, all promises were rejected. Last error message: error2');
        });
    });
});