# Nexos Bot

This is a GitHub App built with [Probot](https://github.com/probot/probot) that automates various GitHub workflows.

[![Node.js Dev](https://github.com/nexoscreator/bot-nexos-app/actions/workflows/node.js.yml/badge.svg)](https://github.com/nexoscreator/bot-nexos-app/actions/workflows/node.js.yml)
[![CI](https://github.com/nexoscreator/bot-nexos-app/actions/workflows/main.yml/badge.svg)](https://github.com/nexoscreator/bot-nexos-app/actions/workflows/main.yml)

## Install

First [Connect bot](https://github.com/apps/nexos-bot)

## Setup

1. Install dependencies:

    ```bash
    npm install
    ```

2. Create a `.env` file with the following variables:

    ```
    APP_ID=your_app_id
    PRIVATE_KEY=path_to_your_private_key.pem
    WEBHOOK_SECRET=your_webhook_secret
    ```

3. Start the app:

    ```bash
    npm start
    ```

4. Expose your local server using `ngrok`:

    ```bash
    ngrok http 3000
    ```

5. Update your GitHub App's Webhook URL to the `ngrok` URL.
