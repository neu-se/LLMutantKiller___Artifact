import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when callback is not a function in the finally method', () => {
        const callback = null;
        expect(() => Q().finally(callback)).toThrowError("Q can't apply finally callback");
    });
});