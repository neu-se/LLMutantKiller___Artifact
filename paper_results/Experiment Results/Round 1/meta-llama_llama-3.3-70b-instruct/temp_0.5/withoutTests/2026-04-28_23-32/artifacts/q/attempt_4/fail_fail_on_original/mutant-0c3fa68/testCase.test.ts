import { Q } from "../../q.js";

describe('Q', () => {
    it('should throw an error when progress function is empty', () => {
        const promise = Q.defer().promise;
        expect(() => Q.progress(promise, () => {})).not.toThrow();
        const emptyProgress = Q.progress;
        Q.progress = function () {};
        expect(() => Q.progress(promise, () => {})).toThrow();
        Q.progress = emptyProgress;
    });
});