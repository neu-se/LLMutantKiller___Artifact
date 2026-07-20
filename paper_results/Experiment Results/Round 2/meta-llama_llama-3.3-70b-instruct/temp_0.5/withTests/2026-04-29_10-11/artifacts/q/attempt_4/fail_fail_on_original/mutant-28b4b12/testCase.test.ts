import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the post method with the provided arguments', () => {
        const obj = {
            method: jest.fn(),
        };

        const promise = Q(obj);
        promise.post('method', ['arg1', 'arg2']);

        expect(promise.dispatch).toHaveBeenCalledTimes(1);
        expect(promise.dispatch).toHaveBeenCalledWith('post', ['method', ['arg1', 'arg2']]);
    });
});