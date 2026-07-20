import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when resolver is not called in promise function', () => {
        const resolver = jest.fn();
        Q.promise(resolver);
        expect(resolver).toHaveBeenCalledTimes(1);
    });
});