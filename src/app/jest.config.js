module.exports = {
  preset: 'ts-jest',  
  testEnvironment: 'jsdom',  
  transform: {
    '^.+\\.tsx?$': 'ts-jest', 
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],  
  transformIgnorePatterns: ['<rootDir>/node_modules/'], 
};
