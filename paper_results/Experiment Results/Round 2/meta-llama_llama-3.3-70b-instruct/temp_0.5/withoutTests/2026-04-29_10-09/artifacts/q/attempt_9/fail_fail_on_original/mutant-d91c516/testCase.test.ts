import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when Q.keys is called on the mutated code', () => {
        const object = { a: 1, b: 2, c: 3 };
        expect(() => Q.keys(object)).toThrowError();
    });
});