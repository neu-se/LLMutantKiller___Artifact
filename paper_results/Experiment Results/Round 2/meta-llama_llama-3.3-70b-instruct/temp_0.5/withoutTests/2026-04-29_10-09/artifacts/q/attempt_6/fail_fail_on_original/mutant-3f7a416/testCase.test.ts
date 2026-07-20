import { Q } from "./q.js";

describe('Q', () => {
    it('should have allSettled method that throws an error when called on mutated code', () => {
        expect(() => Q.allSettled()).toThrowError();
    });
});