import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should not throw TypeError when resolver is a function', () => {
        expect(() => Q.promise(function() {})).not.toThrow(TypeError);
    });
});