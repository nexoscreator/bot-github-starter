// tests/handlers.test.ts
import { test, expect, beforeEach, afterEach } from 'vitest';
import nock from 'nock';
import { Probot, ProbotOctokit } from 'probot';
import myProbotApp from '../src';

const issuePayload = require('./fixtures/issues.opened.json');
const pullRequestPayload = require('./fixtures/pull_request.opened.json');

let probot: Probot;

beforeEach(() => {
  probot = new Probot({
    appId: 123,
    privateKey: 'test',
    octokit: ProbotOctokit.defaults({
      throttle: { enabled: false },
      retry: { enabled: false },
    }),
  });
  probot.load(myProbotApp);
});

afterEach(() => {
  nock.cleanAll();
});

test('sends a notification when an issue is opened', async () => {
  nock('https://hooks.slack.com')
    .post('/services/your/slack/webhook')
    .reply(200);

  nock('https://discord.com')
    .post('/api/webhooks/your/discord/webhook')
    .reply(200);

  const transporter = {
    sendMail: vi.fn().mockResolvedValueOnce({}),
  };
  vi.mock('nodemailer', () => {
    return {
      createTransport: () => transporter,
    };
  });

  await probot.receive({ name: 'issues', payload: issuePayload });

  expect(transporter.sendMail).toHaveBeenCalled();
});

test('sends a notification when a pull request is opened', async () => {
  nock('https://hooks.slack.com')
    .post('/services/your/slack/webhook')
    .reply(200);

  nock('https://discord.com')
    .post('/api/webhooks/your/discord/webhook')
    .reply(200);

  const transporter = {
    sendMail: vi.fn().mockResolvedValueOnce({}),
  };
  vi.mock('nodemailer', () => {
    return {
      createTransport: () => transporter,
    };
  });

  await probot.receive({ name: 'pull_request', payload: pullRequestPayload });

  expect(transporter.sendMail).toHaveBeenCalled();
});
