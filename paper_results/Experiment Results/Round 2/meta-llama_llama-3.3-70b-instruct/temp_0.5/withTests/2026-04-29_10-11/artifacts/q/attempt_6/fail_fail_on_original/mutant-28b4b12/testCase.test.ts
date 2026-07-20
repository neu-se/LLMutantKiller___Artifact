import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should pass the arguments to the post method', () => {
        const obj = {
            method: () => {},
        };

        const promise = Q(obj);
        promise.post('method', ['arg1', 'arg2']);

        // Since we cannot directly test the post method, we can test the dispatch method which is called by post
        const dispatchSpy = jest.spyOn(promise, 'dispatch');
        promise.post('method', ['arg1', 'arg2']);
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith('post', ['method', ['arg1', 'arg2']]);

        // Now, let's test the mutated code
        // In the mutated code, the post method returns this.dispatch("post", []);
        // So, we expect the dispatch method to be called with an empty array as the second argument
        const mutatedDispatchSpy = jest.spyOn(promise, 'dispatch');
        promise.post('method', []);
        expect(mutatedDispatchSpy).toHaveBeenCalledTimes(1);
        expect(mutatedDispatchSpy).toHaveBeenCalledWith('post', []);
    });
});