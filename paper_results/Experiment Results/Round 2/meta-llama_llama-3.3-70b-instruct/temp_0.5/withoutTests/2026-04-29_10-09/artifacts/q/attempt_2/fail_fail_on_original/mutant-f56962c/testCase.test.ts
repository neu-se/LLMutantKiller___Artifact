import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when fcall is called with no arguments on a promise', () => {
        const promise = Q();
        expect(() => promise.fcall()).toThrowError();
    });
});