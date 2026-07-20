import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with a resolver function', () => {
        const resolver = jest.fn();
        Q.promise(resolver);
        expect(resolver).toHaveBeenCalledTimes(1);
    });
});