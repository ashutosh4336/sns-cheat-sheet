import * as AWS from 'aws-sdk';
import { AWSError, SNS } from 'aws-sdk';
import {
  AddPermissionInput,
  ConfirmSubscriptionResponse,
  CreateTopicResponse,
  CreateTopicInput,
  ConfirmSubscriptionInput,
  DeleteTopicInput,
  GetSubscriptionAttributesResponse,
  GetTopicAttributesInput,
  GetSubscriptionAttributesInput,
  ListSubscriptionsResponse,
  ListTopicsResponse,
  ListSubscriptionsByTopicResponse,
  ListSubscriptionsByTopicInput,
  PublishInput,
  PublishResponse,
  RemovePermissionInput,
  SetSubscriptionAttributesInput,
  SetTopicAttributesInput,
  SubscribeInput,
  SubscribeResponse,
  TagList,
  TopicAttributesMap,
  UnsubscribeInput,
} from 'aws-sdk/clients/sns';
import { PromiseResult } from 'aws-sdk/lib/request';

interface IConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

const region = process.env.AWS_REGION || 'ap-south-1';
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID;

const config: IConfig = {
  region: region,
  accessKeyId: accessKeyId || '',
  secretAccessKey: secretAccessKey || '',
};

class SNSClient {
  private sns: SNS;

  constructor(config: IConfig) {
    this.sns = new AWS.SNS(config);
  }

  public async publish(
    topicArn: string,
    message: string
  ): Promise<PromiseResult<PublishResponse, AWSError>> {
    const params: PublishInput = {
      Message: message,
      TopicArn: topicArn,
      // TargetArn?: "String";
      // PhoneNumber?: String;
      // Subject?: String; for email
      // MessageStructure?: "json" | "String";
      // MessageAttributes?: MessageAttributeMap;
      // MessageDeduplicationId?: String;
      // MessageGroupId?: String;
    };

    return this.sns.publish(params).promise();
  }

  public async subscribe(
    topicArn: string,
    protocol: string,
    endpoint: string
  ): Promise<PromiseResult<SubscribeResponse, AWSError>> {
    const params: SubscribeInput = {
      Protocol: protocol,
      TopicArn: topicArn,
      Endpoint: endpoint,
      ReturnSubscriptionArn: true,
      // Attributes: SubscriptionAttributesMap
    };

    return this.sns.subscribe(params).promise();
  }

  public async unsubscribe(
    subscriptionArn: string
  ): Promise<PromiseResult<{}, AWSError>> {
    const params: UnsubscribeInput = {
      SubscriptionArn: subscriptionArn,
    };

    return this.sns.unsubscribe(params).promise();
  }

  public async listSubscriptionsByTopic(
    topicArn: string
  ): Promise<PromiseResult<ListSubscriptionsByTopicResponse, AWSError>> {
    const params: ListSubscriptionsByTopicInput = {
      TopicArn: topicArn,
      // NextToken: 'String',
    };

    return this.sns.listSubscriptionsByTopic(params).promise();
  }

  public async listTopics(): Promise<
    PromiseResult<ListTopicsResponse, AWSError>
  > {
    return this.sns.listTopics().promise();
  }

  public async createTopic(
    name: string,
    attributes: TopicAttributesMap = {},
    tags: TagList = []
  ): Promise<PromiseResult<CreateTopicResponse, AWSError>> {
    const params: CreateTopicInput = {
      Name: name,
      Attributes: attributes,
      Tags: tags,
      //  {
      //     DisplayName: 'string',
      //     FifoTopic: 'true',
      //     ContentBasedDeduplication: 'true',
      //  },

      // Tags?: [{ Key: String, Value: String }];

      /**
       * The body of the policy document you want to use for this topic. You can only add one policy per topic. The policy must be in JSON string format. Length Constraints: Maximum length of 30,720.
       */
      // DataProtectionPolicy?: attributeValue;
    };

    return this.sns.createTopic(params).promise();
  }

  public async deleteTopic(
    topicArn: string
  ): Promise<PromiseResult<{}, AWSError>> {
    const params: DeleteTopicInput = {
      TopicArn: topicArn,
    };

    return this.sns.deleteTopic(params).promise();
  }

  public async getTopicAttributes(topicArn: string): Promise<any> {
    const params: GetTopicAttributesInput = {
      TopicArn: topicArn,
    };

    return this.sns.getTopicAttributes(params).promise();
  }

  public async setTopicAttributes(
    topicArn: string,
    attributeName: string,
    attributeValue: string
  ): Promise<PromiseResult<{}, AWSError>> {
    const params: SetTopicAttributesInput = {
      TopicArn: topicArn,
      AttributeName: attributeName,
      AttributeValue: attributeValue,
    };

    return this.sns.setTopicAttributes(params).promise();
  }

  public async confirmSubscription(
    topicArn: string,
    token: string
  ): Promise<PromiseResult<ConfirmSubscriptionResponse, AWSError>> {
    const params: ConfirmSubscriptionInput = {
      TopicArn: topicArn,
      Token: token,
      // AuthenticateOnUnsubscribe?: String;
    };

    return this.sns.confirmSubscription(params).promise();
  }

  public async listSubscriptions(): Promise<
    PromiseResult<ListSubscriptionsResponse, AWSError>
  > {
    return this.sns.listSubscriptions().promise();
  }

  public async getSubscriptionAttributes(
    subscriptionArn: string
  ): Promise<PromiseResult<GetSubscriptionAttributesResponse, AWSError>> {
    const params: GetSubscriptionAttributesInput = {
      SubscriptionArn: subscriptionArn,
    };

    return this.sns.getSubscriptionAttributes(params).promise();
  }

  public async setSubscriptionAttributes(
    subscriptionArn: string,
    attributeName: string,
    attributeValue: string
  ): Promise<PromiseResult<PublishResponse, AWSError>> {
    const params: SetSubscriptionAttributesInput = {
      SubscriptionArn: subscriptionArn,
      AttributeName: attributeName,
      AttributeValue: attributeValue,
    };

    return this.sns.setSubscriptionAttributes(params).promise();
  }

  public async addPermission(
    topicArn: string,
    label: string,
    aWSAccountIds: string[],
    actions: string[]
  ): Promise<PromiseResult<PublishResponse, AWSError>> {
    const params: AddPermissionInput = {
      TopicArn: topicArn,
      Label: label,
      AWSAccountId: aWSAccountIds,
      ActionName: actions,
    };

    return this.sns.addPermission(params).promise();
  }

  public async removePermission(
    topicArn: string,
    label: string
  ): Promise<PromiseResult<PublishResponse, AWSError>> {
    const params: RemovePermissionInput = {
      TopicArn: topicArn,
      Label: label,
    };

    return this.sns.removePermission(params).promise();
  }

  public async publishToHttp(
    topicArn: string,
    message: string
  ): Promise<PromiseResult<PublishResponse, AWSError>> {
    const params: PublishInput = {
      Message: message,
      TopicArn: topicArn,
      MessageStructure: 'json',
    };

    return this.sns.publish(params).promise();
  }

  public async publishToLambda(
    topicArn: string,
    message: string,
    endpoint: string // Lambda Function ARN
  ): Promise<PromiseResult<PublishResponse, AWSError>> {
    const params: PublishInput = {
      Message: message,
      TopicArn: topicArn,
      MessageStructure: 'json',
      MessageAttributes: {
        'Lambda.Function.Name': {
          DataType: 'String',
          StringValue: endpoint,
        },
      },
    };

    return this.sns.publish(params).promise();
  }

  public async publishToQueue(
    topicArn: string,
    message: string,
    endpoint: string
  ): Promise<PromiseResult<PublishResponse, AWSError>> {
    const params: PublishInput = {
      Message: message,
      TopicArn: topicArn,
      MessageStructure: 'json',
      MessageAttributes: {
        QueueUrl: {
          DataType: 'String',
          StringValue: endpoint,
        },
      },
    };

    return this.sns.publish(params).promise();
  }

  public async publishToSms(
    phoneNumber: string,
    message: string
  ): Promise<PromiseResult<PublishResponse, AWSError>> {
    const params: PublishInput = {
      Message: message,
      PhoneNumber: '+918917510414',
      MessageAttributes: {
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional',
        },
        'AWS.SNS.SMS.SenderID': {
          DataType: 'String',
          StringValue: 'TheHTTP',
        },
        'AWS.SNS.SMS.MaxPrice': {
          DataType: 'Number',
          StringValue: '0.50',
        },
      },
    };

    return this.sns.publish(params).promise();
  }

  public async publishToEmail(
    topicArn: string,
    message: string,
    email: string,
    subject: string = 'TheHTTP'
  ): Promise<PromiseResult<PublishResponse, AWSError>> {
    console.log(311, arguments);

    const params: PublishInput = {
      Message: message,
      Subject: subject,
      TopicArn: topicArn,
      MessageStructure: 'text',
      MessageAttributes: {
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional',
        },
        'AWS.SNS.SMS.SenderID': {
          DataType: 'String',
          StringValue: 'MySenderID',
        },
        'AWS.SNS.SMS.MaxPrice': {
          DataType: 'Number',
          StringValue: '0.50',
        },
        EmailAddress: {
          DataType: 'String',
          StringValue: email,
        },
      },
    };

    return this.sns.publish(params).promise();
  }

  public async publishToPlatformApplication(
    topicArn: string,
    message: string,
    subject: string,
    endpointArn: string
  ): Promise<PromiseResult<PublishResponse, AWSError>> {
    const params: PublishInput = {
      Message: message,
      TopicArn: topicArn,
      Subject: subject,
      MessageAttributes: {
        'AWS.SNS.MOBILE.MPNS.Type': {
          DataType: 'String',
          StringValue: 'token',
        },
        'AWS.SNS.MOBILE.MPNS.NotificationClass': {
          DataType: 'String',
          StringValue: 'realtime',
        },
        'AWS.SNS.MOBILE.MPNS.DeviceConnectionStatus': {
          DataType: 'String',
          StringValue: 'connected',
        },
        'AWS.SNS.MOBILE.MPNS.WindowsLiveEndpoint': {
          DataType: 'String',
          StringValue: endpointArn,
        },
      },
    };

    return this.sns.publish(params).promise();
  }

  public async publishToPlatformEndpoint(
    topicArn: string,
    message: string,
    subject: string,
    endpointArn: string
  ): Promise<PromiseResult<PublishResponse, AWSError>> {
    const params: PublishInput = {
      Message: message,
      TopicArn: topicArn,
      Subject: subject,
      MessageAttributes: {
        'AWS.SNS.MOBILE.MPNS.Type': {
          DataType: 'String',
          StringValue: 'token',
        },
        'AWS.SNS.MOBILE.MPNS.NotificationClass': {
          DataType: 'String',
          StringValue: 'realtime',
        },
        'AWS.SNS.MOBILE.MPNS.DeviceConnectionStatus': {
          DataType: 'String',
          StringValue: 'connected',
        },
        'AWS.SNS.MOBILE.MPNS.WindowsLiveEndpoint': {
          DataType: 'String',
          StringValue: endpointArn,
        },
      },
    };

    return this.sns.publish(params).promise();
  }
}

const snsClient = new SNSClient(config);

export default snsClient;
