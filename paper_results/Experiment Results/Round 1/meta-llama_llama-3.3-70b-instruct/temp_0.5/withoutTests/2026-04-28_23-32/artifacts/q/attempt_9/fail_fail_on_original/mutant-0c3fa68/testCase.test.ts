import { Q } from "./q";

describe('Q', () => {
    it('should throw an error when progress function is empty in mutated code', () => {
        const originalProgress = Q.progress;
        Q.progress = function () {};
        expect(() => Q.progress(Q.defer().promise, jest.fn())).toThrow();
        Q.progress = originalProgress;
    });
});