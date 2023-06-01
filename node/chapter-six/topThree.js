import * as tf from '@tensorflow/tfjs';

tf.tidy(() => {
    const t = tf.tensor([[
        [1, 2, 3, 4, 5],
        [1.1, 2.1, 3.1, 4.1, 5.1],
        [1.2, 2.2, 3.2, 4.2, 5.2],
        [1.2, 12.2, 3.2, 4.2, 5.2],
        [1.3, 2.3, 3.3, 4.3, 5.3],
        [1, 1, 1, 1, 1]
    ]]);
    // Got this implementation from the answer in Appendix B as
    // I couldn't figure it out
    const { values } = tf.topk(t);
    const squeezed = tf.squeeze(values);
    const { values: result, indices } = tf.topk(squeezed, 3);
    result.print();
    indices.print();
});