/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
const newrelicConfig = {
  name: `LiftOff React Starter Kit -  ${process.env.NODE_ENV}`,
  key: process.env.NEW_RELIC_LICENSE_KEY || '',
  log_level: process.env.NEW_RELIC_LOG_LEVEL || 'info',
};

exports.config = {
  // Array of application names.
  app_name: [newrelicConfig.name],
  // Your New Relic license key.
  license_key: newrelicConfig.key,
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: newrelicConfig.log_level
  }
};
