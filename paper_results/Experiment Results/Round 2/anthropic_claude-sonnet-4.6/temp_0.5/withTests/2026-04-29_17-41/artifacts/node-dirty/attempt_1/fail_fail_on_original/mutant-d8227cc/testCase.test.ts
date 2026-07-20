import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const DirtyModule = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
const Dirty = DirtyModule.Dirty || DirtyModule;

describe('dirty file loading', () => {
  it('should correctly load records from a file where the chunk contains a newline not at index 1', (done) => {
    const file = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}.dirty`);
    // Write a file with a record. The JSON {"key":"ab","val":"cd"}\n has \n at index 22, not 1.
    // Original: chunk has \n (not -1), so it proceeds to parse. Data loads correctly.
    // Mutated: chunk has \n at index 22 (not 1), so it also proceeds... hmm same behavior.
    
    // For the mutation to matter, we need a case where:
    // - Original returns early (chunk has no \n, i.e., lastIndexOf === -1)
    // - Mutated does NOT return early (since -1 !== 1)
    // This happens when a chunk arrives without any newline character.
    // In that case, original correctly buffers, mutated incorrectly tries to process.
    
    // We can't easily control chunk sizes in tests...
    // OR we need lastIndexOf('\n') === 1, where original proceeds but mutated returns early.
    // A chunk where \n is at index 1: that would be a 2-char prefix like "x\n..."
    // But the full chunk would be the whole file content read at once typically.
    
    // The key insight: if we write content where the ENTIRE file content has \n at index 1,
    // that means the file starts with one char then newline.
    // Like: `\n` as first record? No...
    // Actually a valid dirty row could be: {"key":"","val":""}\n - \n at index 18
    
    // Hmm, what if the file content is such that lastIndexOf('\n') === 1?
    // That means the LAST newline in the chunk is at position 1.
    // File content: "x\n" - but "x" is not valid JSON.
    // What about a file where the chunk is exactly: `{}\n` - \n at index 2, not 1.
    
    // I think the most reliable approach is to test that when a chunk has NO newline,
    // the original correctly defers (returns early), while the mutant tries to process.
    // But controlling chunk size is hard...
    
    // Alternative: write a file with content where lastIndexOf('\n') === 1
    // That means: only one \n and it's at position 1, OR last \n is at position 1
    // e.g.: "x\n" - invalid, or a file with content "?\n{"key":"a","val":"b"}\n"
    // where ? is some char... but that would be a corrupted first line.
  });
});