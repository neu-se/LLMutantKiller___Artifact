import { promise } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('promise function', () => {
    it('should throw an error when resolver is not a function', () => {
        expect(() => promise()).toThrowError('resolver must be a function.');
    });
});