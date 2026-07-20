import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', () => {
    it('should throw an error when object is provided but timeout is not', () => {
        expect(() => Q.delay(Promise.resolve(), undefined)).toThrowError();
    });
});