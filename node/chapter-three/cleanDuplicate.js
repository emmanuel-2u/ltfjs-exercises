import * as tf from '@tensorflow/tfjs';

tf.tidy(() => {
    const callMeMaybe = tf.tensor([8367677, 4209111, 4209111, 8675309, 8367677]);

    const uniqueTensor = tf.unique(callMeMaybe);

    const values = uniqueTensor.values.arraySync();

    console.log('Unique phone numbers ', values);
});