/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
const newrelicConfig = {
  name: `Triber v4.0 Portal -  ${process.env.NODE_ENV}`,
  key: process.env.NEW_RELIC_LICENSE_KEY || 'f3408bfa6ee493e720ab71fc3c1150fe7037ea4f',
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
