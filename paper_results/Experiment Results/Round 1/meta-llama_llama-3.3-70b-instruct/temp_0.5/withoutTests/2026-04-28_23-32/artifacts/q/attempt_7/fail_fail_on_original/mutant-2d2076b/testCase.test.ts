import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', () => {
    it('should not throw an error when object is provided but timeout is not, in the mutated code', () => {
        expect(() => Q.delay(Promise.resolve(), undefined)).not.toThrowError();
    });
});