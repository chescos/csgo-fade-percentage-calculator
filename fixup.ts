import * as fs from 'fs';

fs.writeFileSync('./dist/cjs/package.json', JSON.stringify({
  type: 'commonjs',
}));

fs.writeFileSync('./dist/esm/package.json', JSON.stringify({
  type: 'module',
}));
