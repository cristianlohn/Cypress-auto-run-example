import { defineConfig } from 'cypress';
const oracledb = require('oracledb');

const connectionDB = async (query: string) => {
  let conn;
  try {
    oracledb.initOracleClient({ configDir: 'C:\\client\\**\\product\\**\\client_1' });

    conn = await oracledb.getConnection({
      user: 'LOCAL',
      password: 'LOCAL',
      connectString: '10.62.1.26:1521/local',
    });

    return await conn.execute(query);
  } catch (err) {
    console.log('Error===>' + err);
    return err;
  } finally {
    if (conn) {
      try {
        conn.commit();
        conn.close();
      } catch (err) {
        console.log('Error===>' + err);
      }
    }
  }
};

export default defineConfig({
  e2e: {
    viewportWidth: 1440,
    viewportHeight: 900,

    numTestsKeptInMemory: 10,
    defaultCommandTimeout: 10000,
    requestTimeout: 12000,
    responseTimeout: 12000,

    chromeWebSecurity: true,

    video: false,
    videoUploadOnPasses: false,

    baseUrl: 'http://localhost:9000/application/v1/',

    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'mocha-junit-reporter, cypress-mochawesome-reporter',

      mochaJunitReporterReporterOptions: {
        mochaFile: 'cypress/results/.xmls/my-test-output-[hash].xml',
        testsuitesTitle: true,
      },

      cypressMochawesomeReporterReporterOptions: {
        reportDir: 'cypress/results',
        charts: true,
        reportPageTitle: 'Execução de testes de API',
        embeddedScreenshots: true,
        saveAllAttempts: false,
        overwrite: true,
        html: false,
        json: true,
        cdn: true,
      },
    },

    env: {
      reporterZephyr: false,
      keyCycleZephyr: '',
      idProjectZephyr: null,
      idUserZephyr: '',

      usuario: 'ADMIN',
      senha: 'ADMIN',
    },

    setupNodeEvents(on) {
      const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
      const exec = require('child_process').execSync;
      const webpackPreprocessor = require('@cypress/webpack-preprocessor');
      const options = {
        typescript: require.resolve('typescript'),
        webpackOptions: require('webpack.config'),
        watchOptions: {},
      };
      require('cypress-mochawesome-reporter/plugin')(on);
      on('file:preprocessor', webpackPreprocessor(options));

      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
        await exec('IF EXIST cypress\\screenshots rmdir /Q /S cypress\\screenshots');
        await exec('IF EXIST cypress\\results rmdir /Q /S cypress\\results');
      });

      on('after:run', async () => {
        console.log('override after:run');
        await exec('npx jrm cypress/results/combined-report.xml "cypress/results/.xmls/*.xml"');
        await exec('npx mochawesome-merge cypress/results/.jsons/*.json > cypress/results/combined-report.json');
        await afterRunHook();
        await exec('rmdir /Q /S cypress\\results\\.xmls');
      });

      on('task', {
        sqlQuery: (query) => {
          return connectionDB(query);
        },
      });
    },
  },
});
