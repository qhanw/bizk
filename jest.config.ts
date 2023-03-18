module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc-node/jest', { module: 'commonjs' }],
  },
};
