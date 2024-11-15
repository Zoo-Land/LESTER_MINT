// const argv = require('minimist')(process.argv.slice(2));

import minimist from 'minimist';
import { createRequire } from 'node:module';

const argv = minimist(process.argv.slice(2));

let selectedChain = argv.chain || 'local';

const settings = {
    "local": {
        "phrase": "coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin",
        "packageId": "",
        "firstVPackageId": "",
        "packagePath": "./move",
        "workersCount": 8,
    },
    "mainnet": {
        "phrase": "", // set it as cli parameter
        "packageId": "0xb24f0c0012cc5c2653821169356e1bb0a45595fdfeb841f29c79483e47ffdfa2",
        "blockStoreId": "0x57035b093ecefd396cd4ccf1a4bf685622b58353566b2f29b271afded2cb4390",
        "treasuryId": "0x7d5c831812d313a17f64eb4983b4c42f2ca0c95da5cd826d06bab9da3f7f1508",
        "coinType": '0x3c680197c3d3c3437f78a962f4be294596c5ebea6cea6764284319d5e832e8e4::meta::META',
        "fomo": {
            "packageId": '0xb24f0c0012cc5c2653821169356e1bb0a45595fdfeb841f29c79483e47ffdfa2',
            "coinType": '0xb24f0c0012cc5c2653821169356e1bb0a45595fdfeb841f29c79483e47ffdfa2::coin::COIN',
        },
        "workersCount": 'auto',
        "rpc": {
            // url: 'https://sui-mainnet.g.allthatnode.com/full/json_rpc',
            // headers: {
            //     "x-allthatnode-api-key": "xxxxxxxxxxxxxx",
            // },
        },
    }, 
    "testnet": {
        "phrase": "coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin coin",
        "packageId": "0x1d4a80381ecca0ea3ea458bf9f0d633323f7226070b85d2de45c091938cfc0fa",
        "blockStoreId": "0xe48cc5da84c7cc60f2c3f50dce9badede4489684bf634cccbdebcc65948f3182",
        "treasuryId": "0xd9b75c90f8ed1b018d04607ab23dc134195046b861001c927ecca370e6b4fb1b",
        "workersCount": 8,
    },
};


settings[selectedChain].chain = selectedChain;
if (argv.phrase) {
    settings[selectedChain].phrase = argv.phrase;
}

settings[selectedChain].do = {meta: true};
if (argv.fomo) {
    settings[selectedChain].do.fomo = true;
    if (!argv.meta) {
        settings[selectedChain].do.meta = false;
    }
}

const require = createRequire(import.meta.url);
const { version } = require('./package.json');
settings[selectedChain].version = version;

export default  settings[selectedChain];
