import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";
import { test, expect } from '@jest/globals';

describe('asyncMap', () => {
  it('should abort when source is slow to ack abort', (done) => {
    const err = new Error('abort');
    let ended = false;

    function source(end: any, cb: any) {
      if (end) setTimeout(() => { cb(end) }, 20)
      else cb(null, 10)
    }

    const read = asyncMap(function (data: any, cb: any) {
      setTimeout(() => { cb(null, data) })
    })(source);

    read(null, function (end: any) {
      if (!end) throw new Error('expected read to end')
      ended = true
    })

    read(err, function (end: any) {
      if (!end) throw new Error('expected abort to end')
      expect(end).toBe(err)
      expect(ended).toBe(true)
      done()
    })
  })
})