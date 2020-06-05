# e2e testing

E-learning application

## Setup

Here are the commands to get set up:

```shell
git clone https://github.com/abidex4yemi/QA-belighted

cd QA-belighted

npm install
```

## Navigate to cypress.json file and insert baseUrl

- Note: the baseUrl should not end with a forward slash

```shell
  "baseUrl": "<rootUrl>",
```

## Navigate to cypress.json file and insert email and password under the env section

```shell
  "email": "<your email>",
  "password": "<your password>"
```

## Running the tests in browser mode

```shell
npm run test:e2e:dev
```

## Running the tests in headless mode and generate report

```shell
npm run test:e2e:run
```

## generating reports

```shell
npm run open:test-report-in-browser
```
