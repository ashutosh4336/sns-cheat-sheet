import snsClient from './sns';

// snsClient
//   .publishToHttp(
//     'arn:aws:sns:ap-south-1:205453495251:TEST-TOPIC',
//     JSON.stringify({
//       default: JSON.stringify({
//         message: 'Hello World',
//         name: 'PranatiShree Panda',
//         age: 20,
//       }),
//     })
//   )
//   .then(console.log)
//   .catch(console.error);

// snsClient
//   .publishToLambda(
//     'arn:aws:sns:ap-south-1:205453495251:TEST-TOPIC',
//     JSON.stringify({
//       default: JSON.stringify({
//         message: 'Hello World',
//         name: 'PranatiShree Panda 12345',
//         age: 20,
//       }),
//     }),
//     'arn:aws:lambda:ap-south-1:205453495251:function:test-11'
//   )
//   .then(console.log)
//   .catch(console.error);

// snsClient
//   .publishToQueue(
//     'arn:aws:sns:ap-south-1:205453495251:TEST-TOPIC',
//     JSON.stringify({
//       default: JSON.stringify({
//         message: 'Hello World',
//         name: 'PranatiShree Panda 1234567890',
//         age: 20,
//       }),
//     }),
//     'https://sqs.ap-south-1.amazonaws.com/205453495251/TEST-QUEUE'
//   )
//   .then(console.log)
//   .catch(console.error);

// snsClient
//   .publishToQueue(
//     'arn:aws:sns:ap-south-1:205453495251:TEST-TOPIC',
//     JSON.stringify({
//       default: JSON.stringify({
//         message: 'Hello World',
//         name: 'PranatiShree Panda 1234567890',
//         age: 20,
//       }),
//     }),
//     'https://sqs.ap-south-1.amazonaws.com/205453495251/TEST-QUEUE'
//   )
//   .then(console.log)
//   .catch(console.error);

// snsClient
//   .getSubscriptionAttributes(
//     'arn:aws:sns:ap-south-1:205453495251:TEST-TOPIC:31abfb9a-1d40-40f1-8bff-5d7776784012'
//   )
//   .then(console.log)
//   .catch(console.error);

// snsClient
//   .publishToEmail(
//     'arn:aws:sns:ap-south-1:205453495251:TEST-TOPIC',
//     'Hello World',
//     'ashu.juga99@Gmail.com',
//     'Bhagwan Hai Kahan Re Tu'
//   )
//   .then(console.log)
//   .catch(console.error);
