import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when fcall is invoked with an empty string as the method name', () => {
        const promise = Q.resolve({ apply: jest.fn() });
        expect(() => promise.fcall('')).toThrowError();
    });
});