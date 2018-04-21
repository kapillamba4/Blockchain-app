pragma solidity ^0.4.21;

contract People {
    struct Person {
        bytes32 firstName;
        bytes32 lastName;
        uint age;
    }

    Person[] public people;
    
    function addPerson(bytes32 _firstName, bytes32 _lastName, uint _age) public returns (bool) {
        Person memory newPerson;
        newPerson.firstName = _firstName;
        newPerson.lastName = _lastName;
        newPerson.age = _age;

        people.push(newPerson);
        return true;
    }

    function getPeople() constant returns (bytes32[], bytes32[], uint[]) {
        bytes32[] memory firstNames = new bytes32[](people.length);
        bytes32[] memory lastNames = new bytes32[](people.length);
        uint[]    memory ages =  new uint[](people.length);

        for (uint i = 0; i < people.length; i++) {
            Person memory currentPerson = people[i];
            firstNames[i] = (currentPerson.firstName);
            lastNames[i] = (currentPerson.lastName);
            ages[i] = (currentPerson.age);
        }

        return (firstNames, lastNames, ages);
    }
}