

## Table of Contents
 - [Details](#details)
 - [Issues Summary](#issues-summary)
 - [Executive summary](#executive-summary)
     - [Week 1](#week-1)
     - [Week 2](#week-2)
 - [Scope](#scope)
 - [Recommendations](#recommendations)
 - [Issues](#issues)
 - [Artifacts](#artifacts)
     - [Surya](#surya)
     - [Coverage](#coverage)
     - [Tests](#tests)
 - [License](#license)


## Details

- **Client** Client name
- **Date** November 2021
- **Lead reviewer** Daniel Luca ([@cleanunicorn](https://twitter.com/cleanunicorn))
- **Reviewers** Daniel Luca ([@cleanunicorn](https://twitter.com/cleanunicorn)), Andrei Simion ([@andreiashu](https://twitter.com/andreiashu))
- **Repository**: [Project name](git@github.com:opynfinance/squeeth-monorepo.git)
- **Commit hash** `474413cbba52708c953a23a500acc4194735c87b`
- **Technologies**
  - Solidity
  - Node.JS

## Issues Summary

| SEVERITY       |    OPEN    |    CLOSED    |
|----------------|:----------:|:------------:|
|  Informational  |  0  |  0  |
|  Minor  |  0  |  0  |
|  Medium  |  0  |  0  |
|  Major  |  0  |  0  |

## Executive summary

This report represents the results of the engagement with **Client name** to review **Project name**.

The review was conducted over the course of **2 weeks** from **October 15 to November 15, 2020**. A total of **5 person-days** were spent reviewing the code.

### Week 1

During the first week, we ...

### Week 2

The second week was ...

## Scope

The initial review focused on the [Project name](git@github.com:opynfinance/squeeth-monorepo.git) repository, identified by the commit hash `474413cbba52708c953a23a500acc4194735c87b`. ...

<!-- We focused on manually reviewing the codebase, searching for security issues such as, but not limited to, re-entrancy problems, transaction ordering, block timestamp dependency, exception handling, call stack depth limitation, integer overflow/underflow, self-destructible contracts, unsecured balance, use of origin, costly gas patterns, architectural problems, code readability. -->

**Includes:**
- GoodContract.sol

**Excludes:**
- BadContract.sol

## Recommendations

We identified a few possible general improvements that are not security issues during the review, which will bring value to the developers and the community reviewing and using the product.

<!-- ### Increase the number of tests

A good rule of thumb is to have 100% test coverage. This does not guarantee the lack of security problems, but it means that the desired functionality behaves as intended. The negative tests also bring a lot of value because not allowing some actions to happen is also part of the desired behavior.

-->

<!-- ### Set up Continuous Integration

Use one of the platforms that offer Continuous Integration services and implement a list of actions that compile, test, run coverage and create alerts when the pipeline fails.

Because the repository is hosted on GitHub, the most painless way to set up the Continuous Integration is through [GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions).

Setting up the workflow can start based on this example template.


```yml
name: Continuous Integration

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  build:
    name: Build and test
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [12.x]
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: cp ./config.sample.js ./config.js
    - run: npm test

  coverage:
    name: Coverage
    needs: build
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [12.x]
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: cp ./config.sample.js ./config.js
    - run: npm run coverage
    - uses: actions/upload-artifact@v2
      with:
        name: Coverage ${{ matrix.node-version }}
        path: |
          coverage/
```

This CI template activates on pushes and pull requests on the **master** branch.

```yml
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]
```

It uses an [Ubuntu Docker](https://hub.docker.com/_/ubuntu) image as a base for setting up the project.

```yml
    runs-on: ubuntu-latest
```

Multiple Node.js versions can be used to check integration. However, because this is not primarily a Node.js project, multiple versions don't provide added value.

```yml
    strategy:
      matrix:
        node-version: [12.x]
```

A script item should be added in the `scripts` section of [package.json](./code/package.json) that runs all tests.

```json
{
   "script": {
      "test": "buidler test"
   }
}
```

This can then be called by running `npm test` after setting up the dependencies with `npm ci`.

If any hidden variables need to be defined, you can set them up in a local version of `./config.sample.js` (locally named `./config.js`). If you decide to do that, you should also add `./config.js` in `.gitignore` to make sure no hidden variables are pushed to the public repository. The sample config file `./config.sample.js` should be sufficient to pass the test suite.

```yml
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: cp ./config.sample.js ./config.js
    - run: npm test
```

You can also choose to run coverage and upload the generated artifacts.

```yml
    - run: npm run coverage
    - uses: actions/upload-artifact@v2
      with:
        name: Coverage ${{ matrix.node-version }}
        path: |
          coverage/
```

At the moment, checking the artifacts is not [that](https://github.community/t/browsing-artifacts/16954) [easy](https://github.community/t/need-clarification-on-github-actions/16027/2), because one needs to download the zip archive, unpack it and check it. However, the coverage can be checked in the **Actions** section once it's set up.

-->

<!-- ### Contract size

The contracts are dangerously close to the hard limit defined by [EIP-170](https://eips.ethereum.org/EIPS/eip-170), specifically **24676 bytes**.

Depending on the Solidity compiler version and the optimization runs, the contract size might increase over the hard limit. As stated in [the Solidity documentation](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#using-the-commandline-compiler), increasing the number of optimizer runs increases the contract size.

> If you want the initial contract deployment to be cheaper and the later function executions to be more expensive, set it to `--optimize-runs=1`. If you expect many transactions and do not care for higher deployment cost and output size, set `--optimize-runs` to a high number.

Even if you remove the unused internal functions, it will not reduce the contract size because the Solidity compiler shakes that unused code out of the generated bytecode.

#### DELEGATECALL approach

Another way to improve contract size is by breaking them into multiple smaller contracts, grouped by functionality and using `DELEGATECALL` to execute that code. A standard that defines code splitting and selective code upgrade is the [EIP-2535 Diamond Standard](https://eips.ethereum.org/EIPS/eip-2535), which is an extension of [Transparent Contract Standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1538.md). A detailed explanation, documentation and implementations can be found in the [EIP-2535](https://eips.ethereum.org/EIPS/eip-2535). However, the current EIP is in **Draft** status, which means the interface, implementation, and overall architecture might change. Another thing to keep in mind is that using this pattern increases the gas cost. -->

## Issues


## Artifacts

### Surya

Sūrya is a utility tool for smart contract systems. It provides a number of visual outputs and information about the structure of smart contracts. It also supports querying the function call graph in multiple ways to aid in the manual inspection and control flow analysis of contracts.

<!-- **Contracts Description Table**

```text
surya mdreport report.md Contract.sol
```

-->

#### Graphs

<!-- ***Contract***

```text
surya graph Contract.sol | dot -Tpng > ./static/Contract_graph.png
```

![Contract Graph](./static/Contract_graph.png)

```text
surya inheritance Contract.sol | dot -Tpng > ./static/Contract_inheritance.png
```

![Contract Inheritance](./static/Contract_inheritance.png)

```text
Use Solidity Visual Auditor
```

![Contract UML](./static/Contract_uml.png) -->

#### Describe

<!-- ```text
$ npx surya describe ./Contract.sol
``` -->

### Coverage

<!-- ```text
$ npm run coverage
``` -->

### Tests

<!-- ```text
$ npx buidler test
``` -->

## License

This report falls under the terms described in the included [LICENSE](./LICENSE).

<link rel="stylesheet" href="./style/print.css"/>