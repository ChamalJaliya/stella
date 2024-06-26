import { ReadableStream } from 'stream/web';
// Helper function to combine streams
export async function* combineStreams(
    ...streams: ReadableStream<Uint8Array>[] // Accept Uint8Array streams
): AsyncIterable<string> {
    const readers = streams.map((stream) => stream.getReader());
    const decoder = new TextDecoder();

    while (readers.length > 0) {
        for (let i = 0; i < readers.length; i++) {
            try {
                const { done, value } = await readers[i].read();
                if (done) {
                    readers.splice(i, 1);
                    i--; // Adjust index after removal
                } else if (value !== undefined) {
                    yield decoder.decode(value); // Decode Uint8Array to string
                }
            } catch (error) {
                console.error(`Error reading from stream ${i}:`, error);
                readers.splice(i, 1);
                i--; // Adjust index
            }
        }
    }
}
