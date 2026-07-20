import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.denodeify', () => {
    it('should throw an error when callback is not a function', () => {
        const callback = 'not a function';
        expect(() => Q.denodeify(callback)).toThrowError("Q can't wrap an undefined function");
    });
});