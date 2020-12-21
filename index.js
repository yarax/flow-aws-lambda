// @flow
// Type definitions for AWS Lambda
// Project: http://docs.aws.amazon.com/lambda
// Definitions by: James Darbyshire <https://github.com/darbio/aws-lambda-typescript>, Michael Skarum <https://github.com/skarum>, Stef Heyenrath <https://github.com/StefH/DefinitelyTyped>, Toby Hede <https://github.com/tobyhede>, Rich Buggy <https://github.com/buggy>, Yoriki Yamaguchi <https://github.com/y13i>, wwwy3y3 <https://github.com/wwwy3y3>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export type CloudFrontRequestEventRecordRequestBody = {|
    action: 'read-only' | 'replace';
    data: string;
    encoding: 'base64' | 'text';
    +inputTruncated: boolean;
|}

export type CloudFrontHeader = {|
    key?: string;
    value: string;
|}

export type CloudFrontHeaders = {|
    [name: string]: CloudFrontHeader[];
|}

export type CloudFrontCustomOrigin = {|
    customHeaders: CloudFrontHeaders;
    domainName: string;
    keepaliveTimeout: number;
    path: string;
    port: number;
    protocol: 'http' | 'https';
    readTimeout: number;
    sslProtocols: string[];
|}

export type CloudFrontS3Origin = {|
    authMethod: 'origin-access-identity' | 'none';
    customHeaders: CloudFrontHeaders;
    domainName: string;
    path: string;
    region: string;
|}

export type CloudFrontOrigin =
| {| s3: CloudFrontS3Origin |}
| {| custom: CloudFrontCustomOrigin |};

export type CloudFrontRequest = {|
    body?: CloudFrontRequestEventRecordRequestBody;
    +clientIp: string;
    +method: string;
    uri: string;
    querystring: string;
    headers: CloudFrontHeaders;
    origin?: CloudFrontOrigin;
|}

export type CloudFrontRequestEventRecordConfig = {|
    +distributionDomainName: string;
    +distributionId: string;
    +eventType: 'origin-request' | 'origin-response' | 'viewer-request' | 'viewer-response';
    +requestId: string;
|}

export type CloudFrontEvent = {
    config: CloudFrontRequestEventRecordConfig;
}

export type CloudFrontRequestEventRecordDetail = CloudFrontEvent & { request: CloudFrontRequest };

export type CloudFrontResponse = {|
    status: string;
    statusDescription: string;
    headers: CloudFrontHeaders;
|}

export type CloudFrontResponseEventRecordDetail = CloudFrontEvent & {
    +request: $Diff<CloudFrontRequest, {| body?: CloudFrontRequestEventRecordRequestBody |}>;
    response: CloudFrontResponse;
};

export type CloudFrontRequestEventRecord = {|
    cf: CloudFrontRequestEventRecordDetail;
|}

export type CloudFrontRequestEvent = {|
    Records: Array<CloudFrontRequestEventRecord>;
|}

export type CloudFrontResponseEventRecord = {|
    cf: CloudFrontResponseEventRecordDetail;
|}

/**
 * CloudFront viewer response or origin response event
 *
 * https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html#lambda-event-structure-response
 */
export type CloudFrontResponseEvent = {|
    Records: CloudFrontResponseEventRecord[];
|}

/**
 * Generated HTTP response in viewer request event or origin request event
 *
 * https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-generating-http-responses-in-requests.html#lambda-generating-http-responses-object
 */
export type CloudFrontResultResponse = {|
    status: string;
    statusDescription?: string;
    headers?: CloudFrontHeaders;
    bodyEncoding?: 'text' | 'base64';
    body?: string;
|}

export type CloudFrontResponseResult = void | null | CloudFrontResultResponse;

// API Gateway "event"
export type APIGatewayEvent<T = string> = {
    body: T | null;
    headers: { [name: string]: string };
    multiValueHeaders: { [name: string]: string[] };
    httpMethod: string;
    isBase64Encoded: boolean;
    path: string;
    pathParameters: { [name: string]: string } | null;
    queryStringParameters: { [name: string]: string } | null;
    multiValueQueryStringParameters: { [name: string]: string[] } | null;
    stageVariables: { [name: string]: string } | null;
    requestContext: {
        accountId: string;
        apiId: string;
        authorizer?: AuthResponseContext | any;
        httpMethod: string;
        identity: {
            accessKey: string | null;
            accountId: string | null;
            apiKey: string | null;
            caller: string | null;
            cognitoAuthenticationProvider: string | null;
            cognitoAuthenticationType: string | null;
            cognitoIdentityId: string | null;
            cognitoIdentityPoolId: string | null;
            sourceIp: string;
            user: string | null;
            userAgent: string | null;
            userArn: string | null;
        },
        stage: string;
        requestId: string;
        resourceId: string;
        resourcePath: string;
    };
    resource: string;
}

// API Gateway CustomAuthorizer "event"
export interface CustomAuthorizerEvent {
    type: string;
    authorizationToken: string;
    methodArn: string;
}

// SNS "event"
export interface SNSMessageAttribute {
    Type: string;
    Value: string;
}

export interface SNSMessageAttributes {
    [name: string]: SNSMessageAttribute;
}

export interface SNSMessage {
    SignatureVersion: string;
    Timestamp: string;
    Signature: string;
    SigningCertUrl: string;
    MessageId: string;
    Message: string;
    MessageAttributes: SNSMessageAttributes;
    Type: string;
    UnsubscribeUrl: string;
    TopicArn: string;
    Subject: string;
}

export interface SNSEventRecord {
    EventVersion: string;
    EventSubscriptionArn: string;
    EventSource: string;
    Sns: SNSMessage;
}

export interface SNSEvent {
    Records: Array<SNSEventRecord>;
}

/**
 * S3Create event
 * https://docs.aws.amazon.com/AmazonS3/latest/dev/notification-content-structure.html
 */
export interface S3EventRecord {
    eventVersion: string;
    eventSource: string;
    awsRegion: string;
    eventTime: string;
    eventName: string;
    userIdentity: {
        principalId: string;
    },
    requestParameters: {
        sourceIPAddress: string;
    },
    responseElements: {
        'x-amz-request-id': string;
        'x-amz-id-2': string;
    },
    s3: {
        s3SchemaVersion: string;
        configurationId: string;
        bucket: {
            name: string;
            ownerIdentity: {
                principalId: string;
            },
            arn: string;
        },
        object: {
            key: string;
            size: number;
            eTag: string;
            versionId: string;
            sequencer: string;
        }
    }
}

export interface S3CreateEvent {
    Records: Array<S3EventRecord>;
}

/**
 * Cognito User Pool event
 * http://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html
 */
export interface CognitoUserPoolEvent {
    version: number;
    triggerSource: "PreSignUp_SignUp" | "PostConfirmation_ConfirmSignUp" | "PreAuthentication_Authentication" | "PostAuthentication_Authentication" | "CustomMessage_SignUp" | "CustomMessage_AdminCreateUser" | "CustomMessage_ResendCode" | "CustomMessage_ForgotPassword" | "CustomMessage_UpdateUserAttribute" | "CustomMessage_VerifyUserAttribute" | "CustomMessage_Authentication" | "DefineAuthChallenge_Authentication" | "CreateAuthChallenge_Authentication" | "VerifyAuthChallengeResponse_Authentication";
    region: string;
    userPoolId: string;
    userName?: string;
    callerContext: {
        awsSdkVersion: string;
        clientId: string;
    };
    request: {
        userAttributes: {[key: string]: string};
        validationData?: {[key: string]: string};
        codeParameter?: string;
        usernameParameter?: string;
        newDeviceUsed?: boolean;
        session?: {
            challengeName: "CUSTOM_CHALLENGE" | "PASSWORD_VERIFIER" | "SMS_MFA" | "DEVICE_SRP_AUTH" | "DEVICE_PASSWORD_VERIFIER" | "ADMIN_NO_SRP_AUTH";
            challengeResult: boolean;
            challengeMetaData?: string;
        }[];
        challengeName?: string;
        privateChallengeParameters?: {[key: string]: string};
        challengeAnswer?: {[key: string]: string};
    };
    response: {
        autoConfirmUser?: boolean;
        smsMessage?: string;
        emailMessage?: string;
        emailSubject?: string;
        challengeName?: string;
        issueTokens?: boolean;
        failAuthentication?: boolean;
        publicChallengeParameters?: {[key: string]: string};
        privateChallengeParameters?: {[key: string]: string};
        challengeMetaData?: string;
        answerCorrect?: boolean;
    };
}

/**
 * CloudFormation Custom Resource event and response
 * http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/crpg-ref.html
 */
type CloudFormationCustomResourceEventCommon = {
    ServiceToken: string;
    ResponseURL: string;
    StackId: string;
    RequestId: string;
    LogicalResourceId: string;
    ResourceType: string;
    ResourceProperties: {
        ServiceToken: string;
        [Key: string]: any;
    }
}

export type CloudFormationCustomResourceCreateEvent = CloudFormationCustomResourceEventCommon & {
    RequestType: "Create";
}

export type CloudFormationCustomResourceUpdateEvent = CloudFormationCustomResourceEventCommon & {
    RequestType: "Update";
    PhysicalResourceId: string;
    OldResourceProperties: {
        [Key: string]: any;
    };
}

export type CloudFormationCustomResourceDeleteEvent = CloudFormationCustomResourceEventCommon & {
    RequestType: "Delete";
    PhysicalResourceId: string;
}

export type CloudFormationCustomResourceEvent = CloudFormationCustomResourceCreateEvent | CloudFormationCustomResourceUpdateEvent | CloudFormationCustomResourceDeleteEvent;

type CloudFormationCustomResourceResponseCommon = {
    PhysicalResourceId: string;
    StackId: string;
    RequestId: string;
    LogicalResourceId: string;
    Data?: {
        [Key: string]: any;
    }
}

export type CloudFormationCustomResourceSuccessResponse = CloudFormationCustomResourceResponseCommon & {
    Status: "SUCCESS";
    Reason?: string;
}

export type CloudFormationCustomResourceFailedResponse = CloudFormationCustomResourceResponseCommon & {
    Status: "FAILED";
    Reason: string;
}

export type CloudFormationCustomResourceResponse = CloudFormationCustomResourceSuccessResponse | CloudFormationCustomResourceFailedResponse;

/**
 * See http://docs.aws.amazon.com/lambda/latest/dg/eventsources.html#eventsources-cloudwatch-logs
 */
export type CloudWatchLogsEvent = {
    awslogs: CloudWatchLogsEventData;
}

export type CloudWatchLogsEventData = {
    data: string;
}

export type CloudWatchLogsDecodedData = {
    owner: string;
    logGroup: string;
    logStream: string;
    subscriptionFilters: Array<string>;
    messageType: string;
    logEvents: Array<CloudWatchLogsLogEvent>;
}

/**
 * See http://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#LambdaFunctionExample
 */
export type CloudWatchLogsLogEvent = {
    id: string;
    timestamp: number;
    message: string;
    extractedFields?: {[key: string]: string};
}

// Context
// http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
export type Context = {
    // Properties
    callbackWaitsForEmptyEventLoop: boolean;
    functionName: string;
    functionVersion: string;
    invokedFunctionArn: string;
    memoryLimitInMB: number;
    awsRequestId: string;
    logGroupName: string;
    logStreamName: string;
    identity?: CognitoIdentity;
    clientContext?: ClientContext;

    // Functions
    getRemainingTimeInMillis(): number;

    // Functions for compatibility with earlier Node.js Runtime v0.10.42
    // For more details see http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-using-old-runtime.html#nodejs-prog-model-oldruntime-context-methods
    done(error: ?Error, result?: any): void;
    fail(error: Error): void;
    fail(message: string): void;
    succeed(message: string): void;
    succeed(object: any): void;
    succeed(message: string, object: any): void;
}

export interface CognitoIdentity {
    cognitoIdentityId: string;
    cognitoIdentityPoolId: string;
}

export interface ClientContext {
    client: ClientContextClient;
    Custom?: any;
    env: ClientContextEnv;
}

export interface ClientContextClient {
    installationId: string;
    appTitle: string;
    appVersionName: string;
    appVersionCode: string;
    appPackageName: string;
}

export interface ClientContextEnv {
    platformVersion: string;
    platform: string;
    make: string;
    model: string;
    locale: string;
}

export type ProxyResult = {
    statusCode: number;
    headers?: {
        [header: string]: boolean | number | string;
    },
    body: string;
    isBase64Encoded?: boolean;
}

/**
 * API Gateway CustomAuthorizer AuthResponse.
 * http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html#api-gateway-custom-authorizer-output
 */
export interface AuthResponse {
    principalId: string;
    policyDocument: PolicyDocument;
    context?: AuthResponseContext;
}

/**
 * API Gateway CustomAuthorizer AuthResponse.PolicyDocument.
 * http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html#api-gateway-custom-authorizer-output
 */
export interface PolicyDocument {
    Version: string;
    Statement: Array<Statement>;
}

/**
 * API Gateway CustomAuthorizer AuthResponse.PolicyDocument.Statement.
 * http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html#api-gateway-custom-authorizer-output
 */
export interface Statement {
    Action: string | [string];
    Effect: string;
    Resource: string | [string];
}

/**
 * API Gateway CustomAuthorizer AuthResponse.PolicyDocument.Statement.
 * http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html#api-gateway-custom-authorizer-output
 */
export interface AuthResponseContext {
    [name: string]: string | number | boolean;
}

/**
 * AWS Lambda handler function.
 * http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html
 *
 * @param event – event data.
 * @param context – runtime information of the Lambda function that is executing.
 * @param callback – optional callback to return information to the caller, otherwise return value is null.
 */
export type Handler = (event: any, context: Context, callback?: Callback) => Promise<any> | void;
export type ProxyHandler = (event: APIGatewayEvent<string>, context: Context, callback?: ProxyCallback) => Promise<ProxyResult> | void;
export type CustomAuthorizerHandler = (event: CustomAuthorizerEvent, context: Context, callback?: CustomAuthorizerCallback) => Promise<AuthResponse> | void;

/**
 * Optional callback parameter.
 * http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html
 *
 * @param error – an optional parameter that you can use to provide results of the failed Lambda function execution.
 * @param result – an optional parameter that you can use to provide the result of a successful function execution. The result provided must be JSON.stringify compatible.
 */
export type Callback = (error: ?Error, result?: any) => void;
export type ProxyCallback = (error: ?Error, result?: ProxyResult) => void;
export type CustomAuthorizerCallback = (error: ?Error, result?: AuthResponse) => void;
