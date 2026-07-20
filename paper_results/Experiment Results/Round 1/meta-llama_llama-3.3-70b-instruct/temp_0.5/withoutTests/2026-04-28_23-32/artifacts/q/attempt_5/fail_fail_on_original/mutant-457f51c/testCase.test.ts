import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should throw an error when exception is accessed on a fulfilled promise', () => {
        const promise = Q.resolve('Test Value');
        expect(() => promise.exception).toThrowError();
    });
});