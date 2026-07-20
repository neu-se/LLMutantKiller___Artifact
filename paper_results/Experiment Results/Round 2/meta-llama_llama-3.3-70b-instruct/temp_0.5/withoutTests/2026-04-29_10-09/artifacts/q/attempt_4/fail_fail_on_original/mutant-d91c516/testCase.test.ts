import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when Q.keys is called with an object and no dispatch function', () => {
        const object = {};
        expect(() => Q.keys(object)).toThrowError();
    });
});