import each from 'async/each';
import defaults from 'lodash/defaults';
import forEach from 'lodash/forEach';
import multimatch from 'multimatch';

import registerExtensionWithTransformer from './utils/registerExtensionWithTransformer';
import registerExtensionToIgnore  from './utils/registerExtensionToIgnore';
import fileProcessor from './fileProcessor';

const defaultOptions = {
  baseFile: null,
  baseFileDirectory: null,
  defaultTemplate: 'Default.jsx',
  directory: 'templates',
  extension: '.html',
  isStatic: true,
  noConflict: true,
  pattern: '**/*',
  preserve: false,
  propsKey: null,
  renderer: 'react',
  requireIgnoreExt: [],
  requireTemplateExt: ['.jsx'],
  templateTag: null,
  tooling: {}
}

const registerExtensions = (options) => {
  forEach(options.requireTemplateExt, (ext) => {
    registerExtensionWithTransformer(ext, options.tooling);
  });

  forEach(options.requireIgnoreExt, (ext) => {
    registerExtensionToIgnore(ext);
  });
};

const reactTemplateProcessor = (options) => (files, metalsmith, done) => {
  const matchedFiles = multimatch(Object.keys(files), options.pattern);
  const processor = fileProcessor(files, metalsmith, options);
  each(matchedFiles, processor, done);
};

export default (options = {}) => {
  defaults(options, defaultOptions);
  registerExtensions(options);

  return reactTemplateProcessor(options);
};
