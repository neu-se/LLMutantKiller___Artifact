import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle a promise', () => {
        const promise = Q.resolve("test");
        const result = promise.then((value) => value);
        expect(result.then((value) => value)).resolves.toBe("test");
    });
});