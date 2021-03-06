const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

// describe("SimpleStorage", () => {})
describe("SimpleStorage", function () {
  // let simpleStorageFactory
  // let simpleStorage
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    // assert
    // expect
    assert.equal(currentValue.toString(), expectedValue);
    // expect(currentValue.toString()).to.equal(expectedValue)
  });
  it("Should update when we call store", async function () {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
  it("Should update peoples array", async function () {
    const person1 = "harry";
    const favoriteNum = "13";
    const transactionResponse = await simpleStorage.addPerson(
      person1,
      favoriteNum
    );
    await transactionResponse.wait(1);

    let { favoriteNumber, name } = await simpleStorage.people(0);
    assert.equal(favoriteNumber, favoriteNum);
    assert.equal(name, person1);
    //or you can read array like this
    // const person = await simpleStorage.people(0);
    // assert.equal(person.name, person1);
    // assert.equal(person.favoriteNumber, favoriteNum);

    const currfavoritNum = await simpleStorage.nameToFavoriteNumber("harry");
    assert.equal(currfavoritNum.toString(), favoriteNum);

    console.log(`haryy logging : ${name}`);
  });
});
