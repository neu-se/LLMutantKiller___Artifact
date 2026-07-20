import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.denodeify', () => {
    it('should return a function when callback is defined', () => {
        const callback = function () {};
        const denodeified = Q.denodeify(callback);
        expect(typeof denodeified).toBe('function');
        denodeified();
    });
});