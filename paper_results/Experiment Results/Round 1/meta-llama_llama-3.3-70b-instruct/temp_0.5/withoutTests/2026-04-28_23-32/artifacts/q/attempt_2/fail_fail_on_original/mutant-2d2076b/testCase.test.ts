import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', () => {
    it('should throw an error when timeout is undefined', () => {
        expect(() => Q.delay(Promise.resolve())).toThrowError();
    });
});