import * as Q from "../../../../../../../../../../../subject_repositories/q/q";
import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue";

describe('Queue', function () {
    it('should handle get after put and close', function () {
        const queue = new Queue();
        queue.put(1);
        queue.close();
        return queue.get().then(function (value) {
            expect(value).toBe(1);
        });
    });
});