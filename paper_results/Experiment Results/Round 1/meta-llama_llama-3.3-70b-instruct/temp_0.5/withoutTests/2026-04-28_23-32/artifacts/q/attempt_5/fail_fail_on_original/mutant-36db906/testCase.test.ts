import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.denodeify', () => {
    it('should not throw an error when callback is a function', () => {
        const callback = function () {};
        expect(() => Q.denodeify(callback)).not.toThrow();
    });
});