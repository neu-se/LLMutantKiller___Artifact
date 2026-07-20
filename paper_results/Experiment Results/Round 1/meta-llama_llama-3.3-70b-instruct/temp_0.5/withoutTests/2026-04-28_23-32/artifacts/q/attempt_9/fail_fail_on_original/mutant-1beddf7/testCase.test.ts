import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should call the resolver function', async () => {
        const resolver = jest.fn();
        Q.promise(resolver);
        expect(resolver).toHaveBeenCalledTimes(1);
    });
});