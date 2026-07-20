import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should dispatch post with correct arguments', () => {
        const promise = Q({ post: jest.fn() });
        promise.post('name', ['arg1', 'arg2']);
        expect(promise.dispatch).toHaveBeenCalledTimes(1);
        expect(promise.dispatch).toHaveBeenCalledWith('post', ['name', ['arg1', 'arg2']]);
    });
});